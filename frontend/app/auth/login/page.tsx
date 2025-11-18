import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - BrandConnect',
  description: 'Sign in to your BrandConnect account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-xl border border-primary/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BrandConnect
            </Link>
            <h1 className="text-2xl font-bold mt-4">Welcome Back</h1>
            <p className="text-text-secondary mt-2">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-border text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-text-secondary cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Forgot password link */}
          <div className="text-center mt-6">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-secondary transition">
              Forgot your password?
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark text-text-secondary">Or continue with</span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button className="w-full px-4 py-2 rounded-lg border border-border text-text hover:bg-dark-lighter transition">
              <div className="flex items-center justify-center gap-2">
                <span>🔵</span> Sign in with Google
              </div>
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-border text-text hover:bg-dark-lighter transition">
              <div className="flex items-center justify-center gap-2">
                <span>💼</span> Sign in with LinkedIn
              </div>
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center mt-8 text-text-secondary">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-secondary transition font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
