import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Powerful Features for Modern Marketing
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to connect brands with authentic influencers and scale your campaigns effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
            <p className="text-text-secondary">Advanced algorithms analyze audience demographics, engagement rates, and content authenticity to find perfect matches.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-3">Secure Escrow Payments</h3>
            <p className="text-text-secondary">Funds are held securely until campaign deliverables are completed and approved by both parties.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
            <p className="text-text-secondary">Track campaign performance with detailed metrics, ROI calculations, and comprehensive reporting dashboards.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-3">KYC Verification</h3>
            <p className="text-text-secondary">All influencers undergo thorough identity verification and fraud detection to ensure brand safety.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-3">Smart Contracts</h3>
            <p className="text-text-secondary">Automated contract generation with clear terms, deliverables, and milestone-based payment releases.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
            <p className="text-text-secondary">Connect with influencers worldwide with multi-currency support and localized payment options.</p>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/signup"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all transform hover:scale-105"
          >
            Start Using These Features
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
