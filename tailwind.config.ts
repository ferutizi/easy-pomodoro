import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom': '0px 3px 0.7px rgba(0, 0, 0, 0.25)',
        'active': '0px 2px 0.7px rgba(0, 0, 0, 0.25)'
      },
      width: {
        '60': '3.75rem'
      },
      height: {
        '60': '3.75rem'
      },
      spacing: {
        'hd': '1080px',
      }
    },
  },
  plugins: [],
}
export default config
