/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'geuwat-cyan': '#00f0ff',
        'geuwat-magenta': '#ff00d4',
        'geuwat-purple': '#9d4edd',
      },
      backgroundImage: {
        'gradient-cyan-magenta': 'linear-gradient(to right, #00f0ff, #ff00d4)',
        'gradient-purple-cyan': 'linear-gradient(to right, #9d4edd, #00f0ff)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-30px, 50px) scale(0.95)' },
          '75%': { transform: 'translate(-50px, -20px) scale(1.02)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
