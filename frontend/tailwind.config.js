module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#357bff',
        secondary: '#24e8d4',
        accent: '#a76bff',
        dark: '#0a0e27',
        'dark-lighter': '#16192b',
        text: '#ffffff',
        'text-secondary': '#b0b9d1',
        border: '#2a3050',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 20px rgba(53, 123, 255, 0.3)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
      },
      backdropBlur: {
        md: '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
