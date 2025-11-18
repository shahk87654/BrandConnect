import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Privacy() {
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
            Privacy Policy
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
            <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <p className="text-text-secondary mb-4">
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Profile information and social media handles</li>
              <li>Payment information and billing details</li>
              <li>Communications you send to us</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Automatically Collected Information</h3>
            <p className="text-text-secondary mb-4">
              When you use our platform, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and platform interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">2. How We Use Your Information</h2>
            <p className="text-text-secondary mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">3. Information Sharing and Disclosure</h2>
            <p className="text-text-secondary mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">4. Data Security</h2>
            <p className="text-text-secondary mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and employee training</li>
              <li>Secure data centers and infrastructure</li>
              <li>Incident response procedures</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">5. Your Rights</h2>
            <p className="text-text-secondary mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Erasure:</strong> Request deletion of your personal information in certain circumstances</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Restriction:</strong> Request limitation of how we process your information</li>
              <li><strong>Objection:</strong> Object to our processing of your personal information</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">6. Cookies and Tracking</h2>
            <p className="text-text-secondary mb-4">
              We use cookies and similar technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">7. International Data Transfers</h2>
            <p className="text-text-secondary mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">8. Data Retention</h2>
            <p className="text-text-secondary mb-4">
              We retain your personal information only as long as necessary for the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">9. Changes to This Policy</h2>
            <p className="text-text-secondary mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">10. Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-text-secondary">
              <p>Email: privacy@brandconnect.local</p>
              <p>Address: 123 Tech Street, London, UK</p>
              <p>Phone: +44 123 456 7890</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
