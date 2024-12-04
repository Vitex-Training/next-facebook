import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        header: 'var(--header-height)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
          accent: 'hsl(var(--primary-accent))',
          disable: 'hsl(var(--primary-disable))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          accent: 'hsl(var(--secondary-accent))',
        },
        cancel: {
          DEFAULT: 'hsl(var(--cancel))',
          foreground: 'hsl(var(--cancel-foreground))',
        },
        icon: {
          DEFAULT: 'hsl(var(--icon))',
          foreground: 'hsl(var(--icon-foreground))',
          accent: 'hsl(var(--icon-accent))',
        },
        ['small-icon']: {
          DEFAULT: 'hsl(var(--small-icon))',
          foreground: 'hsl(var(--small-icon-foreground))',
          accent: 'hsl(var(--small-icon-accent))',
        },
        input: {
          DEFAULT: 'hsl(var(--input))',
          foreground: 'hsl(var(--input-foreground))',
          border: 'hsl(var(--input-border))',
          placeholder: 'hsl(var(--input-placeholder))',
          ['focus-border']: 'hsl(var(--input-focus-border))',
          ['error-border']: 'hsl(var(--input-error-border))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          border: 'hsl(var(--error-border))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          border: 'hsl(var(--info-border))',
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
        ['up-base']: ['17px', '21px'],
        ['up-sm']: ['15px', '19px'],
        ['up-xs']: ['13px', '17px'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
