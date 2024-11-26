import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        header: 'var(--header-height)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        blue: {
          '9': 'rgb(232, 240, 254)',
          '10': '#1877f2',
          '40': '#3578e5',
          '50': '#166fe5',
        },
        green: {
          '40': '#00a400',
        },
        gray: {
          '10': '#dddfe2',
          '11': '#606770',
          '12': '#ccd0d5',
        },
        yellow: {
          '10': '#fff9d7',
          '20': '#e2c822',
        },
        red: {
          '10': '#ffebe8',
          '40': '#be4b49',
          '41': '#dd3c10',
        },
        white: {
          '0': '#fff',
          '1': '#f3f3f47a',
          '10': '#f2f4f7',
          '11': '#FFFFFF',
        },
        black: {
          '0': '#1d2129',
          '1': '#1c1e21eb',
          '2': '#1d2129ba',
          '10': '#000000',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        '3xl': '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
        xxs: '0 0 0 1px rgba(139, 3, 0, .75), 0 1px 10px rgba(0, 0, 0, .35)',
      },
      fontSize: {
        ['up-sm']: ['15px', '19px'],
        ['up-xs']: ['13px', '17px'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
