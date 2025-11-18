# BrandConnect Development Quick Start

## 🚀 Current Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Running | http://localhost:3000 |
| Backend | ✅ Running | http://localhost:3001 |
| API Docs | ✅ Available | http://localhost:3001/api |
| Database | ⏳ Setup Needed | See below |

---

## ⚡ Get Started in 5 Minutes

### 1. Start PostgreSQL Database

**Choose ONE option:**

#### Option A: Windows PostgreSQL Installer (Easiest)
```powershell
# After installing PostgreSQL from https://www.postgresql.org/download/windows/
# Create database
psql -U postgres -c "CREATE DATABASE brandconnect;"

# Verify
psql -U postgres -d brandconnect -c "\dt"
```

#### Option B: WSL2 + Docker
```bash
docker run -d --name brandconnect-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brandconnect \
  -p 5432:5432 postgres:15-alpine
```

### 2. Verify Backend Connected

```powershell
cd backend
npm run start:dev
```

**You should see:**
```
[TypeOrmModule] Database connected successfully
[NestFactory] Starting Nest application...
Nest listening on port 3001
```

### 3. Frontend is Already Running

```powershell
# Already running on http://localhost:3000
# If not, start it:
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
Brand_Connect/
├── frontend/              # Next.js 14 + React 18 + TypeScript
│   ├── app/              # App Router pages
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities, hooks, API client
│   └── styles/           # Global CSS + Tailwind
│
├── backend/              # NestJS 10 + TypeORM + PostgreSQL
│   ├── src/
│   │   ├── modules/      # 8 feature modules
│   │   ├── database/     # Entities, migrations, seeds
│   │   └── main.ts       # Bootstrap
│   └── test/             # E2E tests
│
├── docs/                 # API documentation
├── docker-compose.yml    # Full stack orchestration (needs Docker)
├── DATABASE_SETUP.md     # Database installation guide
└── IMPLEMENTATION_ROADMAP.md  # What to build next
```

---

## 🔧 Development Workflow

### Terminal 1: Database (if using local PostgreSQL)
```powershell
# Just ensure PostgreSQL service is running
# Check: Services → PostgreSQL
```

### Terminal 2: Backend
```powershell
cd backend
npm run start:dev
# Watches for file changes, auto-reloads
# Listening on http://localhost:3001
```

### Terminal 3: Frontend
```powershell
cd frontend
npm run dev
# Watches for file changes, auto-reloads
# Listening on http://localhost:3000
```

---

## 📚 Available Scripts

### Backend
```bash
npm run start:dev       # Start with hot reload
npm run start:debug     # Start with debugger
npm run start:prod      # Production mode
npm run build           # Compile TypeScript
npm run test            # Run unit tests
npm run test:watch      # Watch tests
npm run test:e2e        # E2E tests
npm run lint            # ESLint
npm run format          # Prettier format
npm run migration:run   # Run migrations
npm run seed            # Seed database
```

### Frontend
```bash
npm run dev             # Start dev server
npm run build           # Build for production
npm run start           # Start production build
npm run lint            # ESLint
npm run format          # Prettier format
```

---

## 🎯 Next Steps (Implementation Priority)

### 1. **Database** (Required First)
   - Install PostgreSQL (see DATABASE_SETUP.md)
   - Create `brandconnect` database
   - Backend will auto-create tables

### 2. **Auth Module** (Most Important)
   - Implement: `src/modules/auth/auth.service.ts`
   - Implement: `src/modules/auth/auth.controller.ts`
   - Create DTOs for login/register
   - Create JWT strategy
   - Endpoints: POST /auth/login, /auth/register, POST /auth/logout

### 3. **Users Module**
   - Implement: `src/modules/users/users.service.ts`
   - Implement: `src/modules/users/users.controller.ts`
   - Endpoints: GET /users/profile, PUT /users/profile, etc.

### 4. **Campaigns Module**
   - Create campaign CRUD endpoints
   - Endpoints: GET /campaigns, POST /campaigns, PUT /campaigns/:id

### 5. **Frontend Integration**
   - Connect login/signup to backend auth
   - Connect dashboard to campaign endpoints
   - Implement API error handling

See **IMPLEMENTATION_ROADMAP.md** for detailed breakdown.

---

## 🐛 Troubleshooting

### Database Connection Error
```
ERROR [TypeOrmModule] Unable to connect to the database. Retrying...
```

**Solution:**
1. Install PostgreSQL (see DATABASE_SETUP.md)
2. Create database: `psql -U postgres -c "CREATE DATABASE brandconnect;"`
3. Restart backend: `npm run start:dev`

### Frontend Not Compiling
```
Error: Could not find a valid build in the '.next' directory
```

**Solution:**
```powershell
cd frontend
Remove-Item -r -Force .next
npm run dev
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```powershell
# Find and kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or use different port
PORT=3002 npm run start:dev
```

### Dependencies Issue
```
npm ERR! code ERESOLVE
```

**Solution:**
```powershell
cd backend  # or frontend
npm install --legacy-peer-deps
```

---

## 📖 API Documentation

Once backend is running, visit:
```
http://localhost:3001/api
```

This is auto-generated Swagger documentation with:
- All endpoints
- Request/response schemas
- Try it out functionality
- Authentication (Bearer token)

---

## 🔐 Environment Variables

Backend (`.env.local` - already configured):
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=brandconnect

JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345678
JWT_EXPIRATION=7d

STRIPE_SECRET_KEY=sk_test_...        # Add later
STRIPE_WEBHOOK_SECRET=whsec_...      # Add later
```

Frontend (`.env.local` - already configured):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ENVIRONMENT=development
```

---

## 📞 Key Endpoints (Already Available)

### API Documentation
- `GET http://localhost:3001/api` - Swagger UI
- `GET http://localhost:3001/api-json` - OpenAPI JSON

### Status
- `GET http://localhost:3001/` - Health check (implement in app.controller.ts)

---

## 🎓 Tech Stack Installed

**Frontend:**
- Next.js 14.2.33
- React 18.2.0
- TypeScript 5.3.0
- TailwindCSS 3.3.0
- Framer Motion
- React Query
- Zustand (state management)
- React Hook Form + Zod
- Axios

**Backend:**
- NestJS 10.2.0
- TypeScript 5.3.0
- TypeORM 0.3.16
- PostgreSQL driver
- Passport (auth)
- JWT
- Stripe SDK
- Redis client
- Sentry

---

## 🚢 Deployment Checklist

- [ ] Database setup and migrated
- [ ] All modules implemented and tested
- [ ] Environment variables configured
- [ ] Stripe account setup (for payments)
- [ ] Social media API credentials (for metrics)
- [ ] Build production: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Deploy to hosting (Vercel, Railway, etc.)

---

## 📝 File Editing Tips

**Backend Module Template:**
```typescript
// src/modules/mymodule/mymodule.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MymoduleService } from './mymodule.service';

@Controller('mymodule')
export class MymoduleController {
  constructor(private service: MymoduleService) {}
  
  @Get()
  findAll() {
    return this.service.findAll();
  }
  
  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }
}
```

**Frontend Component Template:**
```typescript
// frontend/components/MyComponent.tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  
  return (
    <div className="p-4">
      {/* Your JSX here */}
    </div>
  );
}
```

---

## 🔗 Useful Resources

- NestJS Docs: https://docs.nestjs.com
- Next.js Docs: https://nextjs.org/docs
- TypeORM Docs: https://typeorm.io
- PostgreSQL Docs: https://www.postgresql.org/docs
- Stripe Docs: https://stripe.com/docs

---

## ✅ Validation Checklist

Run this to verify everything is working:

```powershell
# Check backend running
curl http://localhost:3001/

# Check frontend running  
curl http://localhost:3000/

# Check database connection
psql -U postgres -d brandconnect -c "SELECT 1;"

# View backend logs
# (should show no connection errors once DB is up)
```

---

## 💡 Pro Tips

1. **Use Swagger UI** to test API endpoints instead of Postman
2. **React DevTools** browser extension helps debug frontend
3. **NestJS Inspector** can visualize module dependencies
4. **TypeORM CLI** helps generate migrations
5. Keep `.env.local` private - never commit secrets
6. Use `npm run format` before committing code
7. Run `npm run test` regularly to catch regressions

---

**Ready to start building! 🎉**

Next: Set up PostgreSQL, then start with Auth module implementation.
