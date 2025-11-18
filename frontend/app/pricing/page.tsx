'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import motion components to avoid SSR issues
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });

export default function Pricing() {
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose the perfect plan for your influencer marketing needs. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Starter Plan */}
          <motion.div
            className="glass-card p-8 rounded-xl border border-primary/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold text-primary mb-2">£99<span className="text-lg font-normal">/month</span></div>
              <p className="text-text-secondary">Perfect for small brands getting started</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Up to 5 active campaigns</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Basic AI matching</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Standard analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Email support</span>
              </li>
            </ul>

            <Link
              href="/signup?plan=starter"
              className="block w-full text-center px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Professional Plan */}
          <motion.div
            className="glass-card p-8 rounded-xl border-2 border-secondary relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold text-secondary mb-2">£299<span className="text-lg font-normal">/month</span></div>
              <p className="text-text-secondary">For growing brands scaling their influence</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Unlimited campaigns</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Advanced AI matching</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Real-time analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Custom reporting</span>
              </li>
            </ul>

            <Link
              href="/signup?plan=professional"
              className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="glass-card p-8 rounded-xl border border-accent/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-accent mb-2">Custom</div>
              <p className="text-text-secondary">For large brands with complex needs</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Everything in Professional</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>White-label solution</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>24/7 phone support</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="block w-full text-center px-6 py-3 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">All Plans Include</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Secure escrow payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>KYC verification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Smart contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Global reach</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
