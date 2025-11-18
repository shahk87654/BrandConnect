import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - BrandConnect',
  description: 'Create a new BrandConnect account',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-xl border border-secondary/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BrandConnect
            </Link>
            <h1 className="text-2xl font-bold mt-4">Create Account</h1>
            <p className="text-text-secondary mt-2">Choose your account type to get started</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4 mb-8">
            <label className="block">
              <input type="radio" name="role" value="brand" className="mr-3" defaultChecked />
              <span className="font-medium">I'm a Brand</span>
              <p className="text-sm text-text-secondary ml-6 mt-1">Run campaigns and find influencers</p>
            </label>
            <label className="block">
              <input type="radio" name="role" value="influencer" className="mr-3" />
              <span className="font-medium">I'm an Influencer</span>
              <p className="text-sm text-text-secondary ml-6 mt-1">Get partnership opportunities</p>
            </label>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Minimum 12 characters"
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                required
              />
              <p className="text-xs text-text-secondary mt-2">Must contain uppercase, lowercase, numbers, and symbols</p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition">
                <option>United Kingdom</option>
                <option>United States</option>
              </select>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded border-border cursor-pointer mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-text-secondary cursor-pointer">
                I agree to the <Link href="#" className="text-secondary hover:text-primary transition">Terms of Service</Link> and <Link href="#" className="text-secondary hover:text-primary transition">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-secondary to-accent text-white font-semibold hover:shadow-glow transition-all"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark text-text-secondary">Or sign up with</span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button className="w-full px-4 py-2 rounded-lg border border-border text-text hover:bg-dark-lighter transition">
              <div className="flex items-center justify-center gap-2">
                <span>🔵</span> Sign up with Google
              </div>
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-border text-text hover:bg-dark-lighter transition">
              <div className="flex items-center justify-center gap-2">
                <span>💼</span> Sign up with LinkedIn
              </div>
            </button>
          </div>

          {/* Login link */}
          <p className="text-center mt-8 text-text-secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-secondary hover:text-primary transition font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
