import { ReactNode } from 'react';
import Link from 'next/link';
import { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'BrandConnect - Influencer Marketing Platform',
  description: 'Connect brands with influencers for authentic partnerships',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <div className="min-h-screen bg-dark text-text">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-dark/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BrandConnect
              </Link>
              <div className="flex gap-6">
                <Link href="/login" className="text-text-secondary hover:text-text transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-6 py-2 rounded-lg bg-primary text-white hover:shadow-glow transition-all">
                  Sign Up
                </Link>
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main id="main-content" className="pt-20">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-20 border-t border-border bg-dark-lighter">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-4">Product</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li><a href="mailto:support@brandconnect.local" className="hover:text-primary transition-colors">support@brandconnect.local</a></li>
                    <li><a href="tel:+441234567890" className="hover:text-primary transition-colors">+44 123 456 7890</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border pt-8 flex justify-between items-center">
                <p className="text-sm text-text-secondary">© 2025 BrandConnect. All rights reserved.</p>
                <p className="text-sm text-text-secondary">Made with ❤️ in UK</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
