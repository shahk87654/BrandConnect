import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
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
            About BrandConnect
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're revolutionizing influencer marketing by connecting authentic creators with forward-thinking brands.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-text-secondary mb-6">
              To democratize influencer marketing by creating a transparent, fair, and efficient platform where brands can discover authentic influencers and influencers can monetize their creativity.
            </p>
            <p className="text-text-secondary">
              We believe in building long-term partnerships based on trust, transparency, and mutual success. Our platform eliminates the guesswork and ensures every collaboration delivers measurable results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-text-secondary mb-6">
              Founded in 2023 by a team of marketing veterans and tech innovators, BrandConnect was born from the frustration of inefficient influencer marketing processes.
            </p>
            <p className="text-text-secondary">
              We've processed over $2M in influencer payments and connected 500+ brands with 5,000+ verified creators. Our AI-powered platform ensures every match is perfect, every payment is secure, and every campaign succeeds.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-text-secondary">Clear pricing, honest metrics, and open communication in every partnership.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-text-secondary">We verify every influencer and ensure genuine engagement over fake followers.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-text-secondary">Constantly evolving our platform with cutting-edge AI and user experience improvements.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-4xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-text-secondary">Verified Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                <div className="text-text-secondary">Active Brands</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">$2M+</div>
                <div className="text-text-secondary">Paid Out</div>
              </div>
            </div>
            <Link
              href="/signup"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all transform hover:scale-105"
            >
              Become Part of Our Story
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
