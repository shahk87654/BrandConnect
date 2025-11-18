import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Careers() {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "London, UK (Remote)",
      type: "Full-time",
      description: "Join our engineering team to build the next generation of influencer marketing platform using React, Next.js, and modern web technologies."
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "London, UK (Remote)",
      type: "Full-time",
      description: "Work on cutting-edge AI algorithms for influencer-brand matching, fraud detection, and predictive analytics."
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      description: "Drive product marketing strategies, content creation, and go-to-market campaigns for our B2B and B2C audiences."
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "London, UK (Remote)",
      type: "Full-time",
      description: "Ensure our clients achieve their goals by providing exceptional onboarding, training, and ongoing support."
    },
    {
      title: "Security Engineer",
      department: "Security",
      location: "London, UK (Remote)",
      type: "Full-time",
      description: "Maintain and improve our security infrastructure, conduct security audits, and ensure compliance with industry standards."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "London, UK (Remote)",
      type: "Full-time",
      description: "Create intuitive and beautiful user experiences for our platform, focusing on both brand and influencer interfaces."
    }
  ];

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
            Join Our Team
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Help us revolutionize influencer marketing. We're looking for passionate, talented individuals who want to make an impact.
          </p>
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Work at BrandConnect?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3">Fast-Paced Growth</h3>
                <p className="text-text-secondary">Join a rapidly growing startup in the booming influencer marketing industry.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-3">Innovation Focus</h3>
                <p className="text-text-secondary">Work with cutting-edge AI technology and modern development practices.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">Remote-First Culture</h3>
                <p className="text-text-secondary">Flexible work arrangements with opportunities to collaborate globally.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl hover:transform hover:scale-105 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-text-secondary">
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary mb-4">{job.description}</p>

                <Link
                  href="#"
                  className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-text-secondary mb-6">
              We're always looking for talented individuals. Send us your resume and tell us how you can contribute to our mission.
            </p>
            <Link
              href="mailto:careers@brandconnect.local"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Send Your Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
