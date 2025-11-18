import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-text-secondary">
            Last updated: January 15, 2024
          </p>
        </motion.div>

        <motion.div
          className="prose prose-lg prose-invert max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
            <p className="text-text-secondary mb-4">
              By accessing and using BrandConnect ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">2. Description of Service</h2>
            <p className="text-text-secondary mb-4">
              BrandConnect is an influencer marketing platform that connects brands with verified influencers. Our services include:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>AI-powered influencer matching</li>
              <li>Campaign management tools</li>
              <li>Secure escrow payment processing</li>
              <li>Analytics and reporting</li>
              <li>KYC verification services</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-4">Account Creation</h3>
            <p className="text-text-secondary mb-4">
              To use our services, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-xl font-semibold mb-4">Account Types</h3>
            <p className="text-text-secondary mb-4">
              We offer accounts for brands and influencers. Each account type has specific features and responsibilities.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">4. User Responsibilities</h2>
            <p className="text-text-secondary mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in fraudulent or deceptive practices</li>
              <li>Maintain professional conduct in all interactions</li>
              <li>Complete agreed-upon campaign deliverables</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">5. Payment Terms</h2>
            <h3 className="text-xl font-semibold mb-4">Subscription Fees</h3>
            <p className="text-text-secondary mb-4">
              Subscription fees are billed in advance and are non-refundable. We reserve the right to change pricing with 30 days notice.
            </p>

            <h3 className="text-xl font-semibold mb-4">Campaign Payments</h3>
            <p className="text-text-secondary mb-4">
              Campaign payments are held in escrow until deliverables are completed and approved. All payments are processed securely through our payment partners.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">6. Intellectual Property</h2>
            <p className="text-text-secondary mb-4">
              The Service and its original content, features, and functionality are owned by BrandConnect and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-text-secondary mb-4">
              You retain ownership of content you create and share on our platform, but grant us a license to use, display, and distribute it as necessary to provide our services.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">7. Prohibited Activities</h2>
            <p className="text-text-secondary mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">8. Termination</h2>
            <p className="text-text-secondary mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">9. Disclaimers</h2>
            <p className="text-text-secondary mb-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, or materials included therein.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">10. Limitation of Liability</h2>
            <p className="text-text-secondary mb-4">
              In no event shall BrandConnect, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">11. Governing Law</h2>
            <p className="text-text-secondary mb-4">
              These Terms shall be interpreted and governed by the laws of England and Wales, without regard to conflict of law provisions.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">12. Changes to Terms</h2>
            <p className="text-text-secondary mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through our platform.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">13. Contact Information</h2>
            <p className="text-text-secondary mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="text-text-secondary">
              <p>Email: legal@brandconnect.local</p>
              <p>Address: 123 Tech Street, London, UK</p>
              <p>Phone: +44 123 456 7890</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
