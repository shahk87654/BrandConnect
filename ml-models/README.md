# BrandConnect ML Models

## Overview

Machine learning modules for influencer scoring, authenticity detection, and price optimization.

## 1. Fake Follower Detector

**Purpose:** Identify influencers with suspicious follower growth or engagement patterns.

**Features:**
```
Input:
├─ Follower growth rate (monthly change %)
├─ Follower growth consistency (std deviation)
├─ Engagement rate (likes + comments / followers)
├─ Comment engagement ratio (comments / likes)
├─ Comment quality (NLP sentiment analysis)
├─ Follower/following ratio
├─ Posting frequency
├─ Audience location distribution (entropy)
├─ Bio length & keyword analysis
└─ Account age

Output:
└─ Risk Score: 0-100 (0 = genuine, 100 = definitely fake)
```

**Algorithm:** LightGBM Classifier

**Dataset:**
- Training: 50k influencer accounts (labeled manually)
- Validation: 10k accounts
- Test: 10k accounts
- Sources: Instagram, TikTok, YouTube

**Model Performance Target:**
- Precision: > 95% (minimize false positives)
- Recall: > 85% (catch suspicious accounts)
- AUC-ROC: > 0.92

**Usage:**
```python
from models.fake_follower_detector import FakeFollowerDetector

detector = FakeFollowerDetector()
detector.load_model('models/checkpoints/fake-follower-detector-v1.pkl')

features = {
    'follower_growth_rate': 5.2,
    'engagement_rate': 3.5,
    'follower_following_ratio': 2.1,
    ...
}

risk_score = detector.predict(features)
print(f"Fake follower risk: {risk_score}/100")
```

**API Endpoint:**
```bash
POST /api/v1/ml/fake-follower-risk
Content-Type: application/json

{
  "user_id": "influencer_123",
  "platform": "instagram",
  "stats": { ... }
}

Response:
{
  "risk_score": 28,
  "risk_level": "low",
  "confidence": 0.94,
  "top_signals": [
    "unusually high engagement rate (5.2%)",
    "consistent follower growth",
    "high comment engagement"
  ]
}
```

---

## 2. Match Scorer

**Purpose:** Score brand-influencer compatibility for optimal campaign matching.

**Features:**
```
Audience Similarity:
├─ Age group overlap (Hellinger distance)
├─ Gender distribution similarity
├─ Geographic overlap
├─ Interest/category alignment
└─ Niche tag similarity

Performance:
├─ Engagement rate
├─ Historical campaign completion rate
├─ Content quality score (perceptual hashing)
└─ Audience authenticity

Brand Alignment:
├─ Brand values match (NLP embedding distance)
├─ Content tone compatibility
├─ Previous brand work in same category
└─ Audience sentiment towards brand

Output:
└─ Match Score: 0-1 (0 = terrible match, 1 = perfect match)
```

**Algorithm:** XGBoost Regression + Weighted Scoring

**Dataset:**
- Training: 5k previous campaigns with success metrics
- Validation: 1k campaigns
- Test: 1k campaigns

**Model Performance Target:**
- RMSE: < 0.08 (match score deviation)
- Ranking correlation: > 0.85

**Usage:**
```python
from models.match_scorer import MatchScorer

scorer = MatchScorer()
scorer.load_model('models/checkpoints/match-scorer-v2.pkl')

brand_profile = {
    'category': 'fashion',
    'audience': {...},
    'values': ['sustainability', 'diversity']
}

influencer_profile = {
    'primary_niche': 'fashion_lifestyle',
    'platforms': ['instagram'],
    'audience': {...},
    'engagement_rate': 4.8
}

match_score, explainability = scorer.predict(
    brand_profile, 
    influencer_profile,
    return_explanation=True
)

print(f"Match score: {match_score:.2f}")
print(f"Top factors: {explainability['top_3_factors']}")
```

**API Endpoint:**
```bash
POST /api/v1/ml/match-score
Content-Type: application/json

{
  "campaign_id": "camp_123",
  "influencer_id": "infl_456"
}

Response:
{
  "match_score": 0.87,
  "percentile": 92, # Top 8% of matches for this campaign
  "explanation": {
    "positive_factors": [
      "Audience age overlap: 85%",
      "Category alignment: Strong",
      "Engagement rate: Above average (4.8%)"
    ],
    "concerns": [
      "Geographic reach: Limited to UK (campaign wants US too)"
    ]
  }
}
```

---

## 3. Price Suggester

**Purpose:** Recommend optimal pricing for influencers based on market rates and performance.

**Features:**
```
Influencer Metrics:
├─ Followers (log scale)
├─ Engagement rate
├─ Authenticity score
├─ Niche/category
├─ Content type (post, reel, story, etc)
└─ Platform

Market Data:
├─ Recent campaign prices (similar influencers)
├─ Seasonality (holiday premiums)
├─ Campaign type (launch vs awareness)
├─ Geography
└─ Brand budget range

Output:
└─ Price Range: (min, suggested, max)
```

**Algorithm:** Gradient Boosting Regressor

**Dataset:**
- Training: 10k completed campaigns with prices
- Validation: 2k campaigns
- Test: 2k campaigns

**Model Performance Target:**
- MAPE: < 25% (mean absolute percentage error)
- Price predictions within ±30% of actual

**Usage:**
```python
from models.price_suggester import PriceSuggester

suggester = PriceSuggester()
suggester.load_model('models/checkpoints/price-suggester-v1.pkl')

influencer_data = {
    'followers': 150000,
    'engagement_rate': 4.5,
    'authenticity_score': 0.92,
    'niche': 'fashion',
    'platform': 'instagram'
}

deliverable_type = 'static_post'
market_data = {
    'recent_avg_price': 1200,
    'market_trend': 1.05,  # 5% increase
    'seasonality_factor': 1.0
}

prices = suggester.predict(
    influencer_data,
    deliverable_type,
    market_data
)

print(f"Price range: £{prices['min']} - £{prices['max']}")
print(f"Suggested: £{prices['suggested']}")
```

**API Endpoint:**
```bash
POST /api/v1/ml/price-suggestion
Content-Type: application/json

{
  "influencer_id": "infl_123",
  "deliverable_type": "static_post",
  "platform": "instagram"
}

Response:
{
  "currency": "GBP",
  "min_price": 800,
  "suggested_price": 1500,
  "max_price": 2500,
  "confidence": 0.91,
  "factors": {
    "follower_count_premium": 1.3,
    "engagement_premium": 1.15,
    "authenticity_premium": 1.05,
    "market_trend": 1.05
  }
}
```

---

## Model Management

### Versioning

```bash
# Save new model version
models/fake-follower-detector/
├── v0.1/
│   ├── model.pkl
│   ├── config.json
│   ├── metadata.json  # Training date, performance metrics
│   └── training-log.txt
├── v0.2/
│   └── ...
└── v1.0/
    └── ...  # Production version

# Metadata example
{
  "version": "1.0",
  "training_date": "2024-01-15",
  "algorithm": "LightGBM",
  "training_samples": 50000,
  "validation_auc": 0.924,
  "precision": 0.96,
  "recall": 0.87,
  "feature_importance": {
    "follower_growth_rate": 0.32,
    "engagement_rate": 0.28,
    ...
  }
}
```

### Deployment

```bash
# Train new model
python -m models.fake_follower_detector.train \
  --epochs=100 \
  --learning_rate=0.1 \
  --output_dir=models/checkpoints

# Evaluate on test set
python -m models.fake_follower_detector.evaluate \
  --model=models/checkpoints/latest.pkl \
  --test_data=data/test_set.csv

# Deploy to inference service
docker build -f infra/docker/Dockerfile.ml-inference \
  -t brandconnect/ml-inference:v1.0 \
  ./ml-models

docker push brandconnect/ml-inference:v1.0

# Update Kubernetes
kubectl set image deployment/ml-inference \
  inference=brandconnect/ml-inference:v1.0 \
  -n brandconnect
```

### Monitoring

```bash
# Model drift detection
# Compare recent predictions to historical distribution

# Monitor via Prometheus
model_prediction_latency_seconds{model="fake_follower_detector"}
model_inference_errors_total{model="match_scorer"}
model_feature_drift_score{model="price_suggester"}

# Alerts
- Inference latency > 500ms
- Error rate > 1%
- Feature drift > 0.2
```

### Retraining

**Triggers:**
- Monthly full retraining with latest data
- Weekly incremental learning with new campaigns
- Immediate retraining if performance drops > 10%

```bash
# Monthly full retrain
python -m models.retrain \
  --models=all \
  --training_window=30days \
  --validation_split=0.2

# Automatic evaluation & rollback if worse
# New model deployed only if metrics improve
```

---

## API Inference Service

**Tech Stack:**
- FastAPI (Python async)
- Redis caching
- Model hot-reload
- gRPC for low-latency calls

**Dockerfile:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ml-models ./ml-models

EXPOSE 8000

CMD ["uvicorn", "inference_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

**API Structure:**
```python
# inference_api.py
from fastapi import FastAPI, BackgroundTasks
from redis import Redis

app = FastAPI()
redis = Redis(host='redis', port=6379)
models = {}

@app.on_event("startup")
async def load_models():
    models['fake_follower_detector'] = load_model('fake-follower-detector')
    models['match_scorer'] = load_model('match-scorer')
    models['price_suggester'] = load_model('price-suggester')

@app.post("/predict/fake-follower-risk")
async def predict_fake_follower_risk(request: FakeFollowerRequest):
    # Check cache
    cache_key = f"fake_follower:{request.user_id}"
    cached = redis.get(cache_key)
    if cached:
        return json.loads(cached)

    # Predict
    prediction = models['fake_follower_detector'].predict(request.dict())

    # Cache for 24 hours
    redis.setex(cache_key, 86400, json.dumps(prediction))

    return prediction
```

---

## Files

```
ml-models/
├── README.md
├── requirements.txt
├── fake_follower_detector/
│   ├── __init__.py
│   ├── model.py
│   ├── train.py
│   ├── evaluate.py
│   └── features.py
├── match_scorer/
│   ├── __init__.py
│   ├── model.py
│   ├── train.py
│   └── features.py
├── price_suggester/
│   ├── __init__.py
│   ├── model.py
│   ├── train.py
│   └── features.py
├── inference_api.py
├── checkpoints/
│   ├── fake-follower-detector-v1.pkl
│   ├── match-scorer-v2.pkl
│   └── price-suggester-v1.pkl
└── data/
    ├── training_set.csv
    ├── validation_set.csv
    └── test_set.csv
```

---

## Model Drift & Retraining

```python
# Monitor for drift
def detect_drift(new_data, baseline_distribution):
    """Kolmogorov-Smirnov test for distribution shift"""
    statistic, p_value = ks_2samp(new_data, baseline_distribution)
    
    if p_value < 0.05:
        alert("Model drift detected", severity="warning")
        trigger_retraining()

# Scheduled retraining
@scheduler.scheduled_job('interval', days=30)
def monthly_retrain():
    new_data = fetch_campaigns(days=30)
    models['all'].retrain(new_data)
    models['all'].evaluate()
    if metrics_improved():
        models['all'].deploy()
    else:
        alert("Retraining did not improve metrics")
```

## Future Enhancements

- [ ] Real-time model inference (gRPC)
- [ ] A/B testing framework for model versions
- [ ] Automated feature engineering (featuretools)
- [ ] Federated learning for privacy
- [ ] GPU acceleration for training
- [ ] Multi-armed bandit for price optimization
- [ ] Explainability dashboard (SHAP)
