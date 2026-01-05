/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@untitledui/icons/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fbfaf8',
          100: '#f3f0eb', // Figma Background
          200: '#e6ded4',
          300: '#d0c3b0',
        },
        primary: {
          50: '#fdf8f4',
          100: '#fbeee6',
          200: '#f7dbc4',
          300: '#f1c29e',
          400: '#ea9f70',
          500: '#e37d3d',
          600: '#d0771e', // User specified primary
          700: '#ae5f18',
          800: '#8e4c19',
          900: '#723e19',
          950: '#3e1e0a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      },
    },
    boxShadow: {
      'xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    }
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
  },
},
plugins: [
  require('tailwindcss-animate'),
],
}