import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Connect with Authentic Influencers
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
            BrandConnect is the platform where brands meet influencers. Scale your campaigns with verified creators and transparent payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/signup?role=brand"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all transform hover:scale-105"
            >
              Get Started as Brand
            </Link>
            <Link
              href="/signup?role=influencer"
              className="px-8 py-4 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary/10 transition-all"
            >
              Join as Influencer
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="glass-card p-6">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-text-secondary">Verified Influencers</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold text-secondary mb-2">500+</div>
              <div className="text-text-secondary">Active Brands</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold text-accent mb-2">$2M+</div>
              <div className="text-text-secondary">Paid Out</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Why BrandConnect?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-xl border border-primary/20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Smart Discovery</h3>
              <p className="text-text-secondary">Find the perfect influencers with AI-powered matching based on audience, engagement, and authenticity scores.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-xl border border-secondary/20">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-text-secondary">Escrow-based payments with Stripe, PCI-DSS compliant, with no hidden fees or chargebacks.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-xl border border-accent/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Metrics</h3>
              <p className="text-text-secondary">Track campaign performance in real-time with verified metrics and comprehensive analytics dashboards.</p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-8 rounded-xl border border-primary/20">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-3">Verified Creators</h3>
              <p className="text-text-secondary">KYC verified influencers with Onfido checks and fraud detection to ensure brand safety.</p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-8 rounded-xl border border-secondary/20">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold mb-3">Transparent Process</h3>
              <p className="text-text-secondary">Clear negotiations, detailed contracts, and milestone-based payments for peace of mind.</p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-8 rounded-xl border border-accent/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">Global Support</h3>
              <p className="text-text-secondary">Available in UK and USA with multi-currency support and 24/7 customer support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Campaign</h3>
              <p className="text-text-secondary text-sm">Set your brief, budget, deliverables, and target audience in minutes.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-secondary mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Find Influencers</h3>
              <p className="text-text-secondary text-sm">Get AI-matched influencers or search manually with advanced filters.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Negotiate & Agree</h3>
              <p className="text-text-secondary text-sm">Exchange offers, counter-offers, and sign digital contracts.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Execute & Pay</h3>
              <p className="text-text-secondary text-sm">Fund escrow, receive content, approve, and release payment to creator.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <div className="flex gap-1 mb-4">{'⭐⭐⭐⭐⭐'}</div>
              <p className="text-text-secondary mb-6">&quot;BrandConnect made finding the right influencers so easy. The AI matching was spot-on and all our campaigns exceeded KPIs.&quot;</p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-text-secondary">Marketing Director, Fashion Brand</div>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <div className="flex gap-1 mb-4">{'⭐⭐⭐⭐⭐'}</div>
              <p className="text-text-secondary mb-6">&quot;Finally, a platform where I can manage multiple brand partnerships professionally. The escrow system gave me confidence.&quot;</p>
              <div className="font-semibold">Alex Chen</div>
              <div className="text-sm text-text-secondary">Influencer, 500K+ Followers</div>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <div className="flex gap-1 mb-4">{'⭐⭐⭐⭐⭐'}</div>
              <p className="text-text-secondary mb-6">&quot;The transparency and fraud detection features are exactly what our team needed. No more worrying about fake followers.&quot;</p>
              <div className="font-semibold">Michael Park</div>
              <div className="text-sm text-text-secondary">Brand Manager, Tech Company</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-12">Join thousands of brands and influencers already growing together on BrandConnect.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/signup?role=brand"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all transform hover:scale-105"
            >
              Launch Your Campaign
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Already Have an Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
