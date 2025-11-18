import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Contact() {
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
            Get in Touch
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Have questions about our platform? Need support? We're here to help you succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-text-secondary mb-2">General inquiries and support</p>
                  <a href="mailto:hello@brandconnect.local" className="text-primary hover:text-secondary transition-colors">
                    hello@brandconnect.local
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">💼</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Development</h3>
                  <p className="text-text-secondary mb-2">Partnerships and enterprise solutions</p>
                  <a href="mailto:business@brandconnect.local" className="text-primary hover:text-secondary transition-colors">
                    business@brandconnect.local
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🛠️</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                  <p className="text-text-secondary mb-2">Platform issues and technical questions</p>
                  <a href="mailto:support@brandconnect.local" className="text-primary hover:text-secondary transition-colors">
                    support@brandconnect.local
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-text-secondary mb-2">Mon-Fri, 9AM-6PM GMT</p>
                  <a href="tel:+441234567890" className="text-primary hover:text-secondary transition-colors">
                    +44 123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office Address</h3>
                  <p className="text-text-secondary">
                    123 Tech Street<br />
                    London, UK<br />
                    EC2A 1PQ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Business Partnership</option>
                    <option>Billing Question</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">How do I get started?</h3>
                <p className="text-text-secondary mb-4">Sign up for a free account and complete your profile. We'll guide you through the onboarding process.</p>

                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-text-secondary mb-4">We accept major credit cards, bank transfers, and popular digital payment methods.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">How does influencer verification work?</h3>
                <p className="text-text-secondary mb-4">Our KYC process includes identity verification, social media authentication, and fraud detection.</p>

                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-text-secondary mb-4">We offer refunds within 30 days for annual plans. Monthly plans are non-refundable.</p>
              </div>
            </div>

            <Link
              href="/faq"
              className="inline-block mt-6 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
            >
              View All FAQs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
