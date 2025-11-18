'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import motion components to avoid SSR issues
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionArticle = dynamic(() => import('framer-motion').then(mod => mod.motion.article), { ssr: false });

export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of Influencer Marketing: AI-Powered Matching",
      excerpt: "Discover how artificial intelligence is revolutionizing how brands connect with influencers for more authentic and effective campaigns.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "Building Trust: The Importance of KYC in Influencer Platforms",
      excerpt: "Learn why Know Your Customer verification is crucial for maintaining platform integrity and protecting all stakeholders.",
      date: "2024-01-10",
      readTime: "4 min read",
      category: "Security"
    },
    {
      title: "ROI Measurement: Beyond Vanity Metrics in Influencer Campaigns",
      excerpt: "A comprehensive guide to measuring real return on investment from your influencer marketing efforts.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Strategy"
    },
    {
      title: "The Rise of Micro-Influencers: Quality Over Quantity",
      excerpt: "Why smaller influencers with engaged audiences often deliver better results than mega-influencers.",
      date: "2023-12-28",
      readTime: "4 min read",
      category: "Trends"
    },
    {
      title: "Smart Contracts in Influencer Marketing: A Game Changer",
      excerpt: "How blockchain-based smart contracts are streamlining influencer-brand relationships and payments.",
      date: "2023-12-20",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "GDPR Compliance: Protecting Data in the Influencer Economy",
      excerpt: "Understanding your responsibilities and rights when handling personal data in influencer marketing.",
      date: "2023-12-15",
      readTime: "4 min read",
      category: "Legal"
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
            BrandConnect Blog
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Insights, trends, and expert advice on influencer marketing, platform updates, and industry best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="glass-card p-6 rounded-xl hover:transform hover:scale-105 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-text-secondary">{post.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-text-secondary mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <Link
                  href="#"
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-text-secondary mb-6">
              Subscribe to our newsletter for the latest insights and platform updates delivered to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-dark-lighter border border-border focus:border-primary focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
