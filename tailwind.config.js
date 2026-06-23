/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8F8F8',
          white: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#F8F8F8',
          hover: '#F0F0F0',
        },
        rule: {
          DEFAULT: '#E5E5E5',
          light: '#EEEEEE',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#555555',
          muted: '#999999',
          inverse: '#FFFFFF',
        },
        signal: {
          DEFAULT: '#CC6600',
          hover: '#B35900',
          soft: '#FFF5EB',
        },
        footer: {
          DEFAULT: '#111111',
          border: '#222222',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"Inter"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-sub': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      maxWidth: {
        container: '1440px',
        narrow: '720px',
      },
      spacing: {
        header: '64px',
        section: '5rem',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.06)',
        nav: '0 1px 0 rgba(0,0,0,0.05)',
      },
      zIndex: {
        header: 50,
        overlay: 40,
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.25s ease-out',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
