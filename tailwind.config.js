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
        christmas: {
          red: '#C41E3A',
          green: '#165B33',
          gold: '#FFD700',
          snow: '#FFFAFA',
          darkGreen: '#0B3D20',
        },
      },
      backgroundImage: {
        'gradient-christmas': 'linear-gradient(135deg, #165B33 0%, #0B3D20 100%)',
      },
    },
  },
  plugins: [],
}
