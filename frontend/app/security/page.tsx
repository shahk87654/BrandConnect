import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Security() {
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
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Your data and transactions are protected by industry-leading security measures and compliance standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3">Bank-Level Encryption</h3>
            <p className="text-text-secondary">All data is encrypted using AES-256 encryption, the same standard used by major banks and financial institutions.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-3">PCI DSS Compliant</h3>
            <p className="text-text-secondary">Payment processing meets PCI DSS Level 1 compliance standards for maximum security of financial transactions.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-3">KYC Verification</h3>
            <p className="text-text-secondary">All influencers undergo thorough identity verification with Onfido integration and fraud detection systems.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">Fraud Detection</h3>
            <p className="text-text-secondary">Advanced AI-powered fraud detection monitors transactions and user behavior in real-time.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Regular Audits</h3>
            <p className="text-text-secondary">Independent security audits conducted quarterly by certified third-party auditors.</p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
            <p className="text-text-secondary">Full compliance with GDPR and other international data protection regulations.</p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Security Certifications</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <div className="font-semibold">ISO 27001</div>
                <div className="text-sm text-text-secondary">Information Security</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="font-semibold">PCI DSS</div>
                <div className="text-sm text-text-secondary">Payment Security</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🇪🇺</div>
                <div className="font-semibold">GDPR</div>
                <div className="text-sm text-text-secondary">Data Protection</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <div className="font-semibold">SOC 2</div>
                <div className="text-sm text-text-secondary">Trust Services</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/signup"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all transform hover:scale-105"
          >
            Start with Confidence
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
