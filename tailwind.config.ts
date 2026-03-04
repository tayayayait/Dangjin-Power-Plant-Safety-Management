import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "48px",
      screens: {
        "2xl": "1760px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.2', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.35', letterSpacing: '-0.2px', fontWeight: '600' }],
        'h3': ['26px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['22px', { lineHeight: '1.6', letterSpacing: '0.1px', fontWeight: '400' }],
        'body': ['20px', { lineHeight: '1.6', letterSpacing: '0.1px', fontWeight: '400' }],
        'body-sm': ['18px', { lineHeight: '1.5', letterSpacing: '0.1px', fontWeight: '400' }],
        'caption': ['16px', { lineHeight: '1.4', letterSpacing: '0.2px', fontWeight: '400' }],
        'button': ['22px', { lineHeight: '1.0', letterSpacing: '0.3px', fontWeight: '600' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          dark: "hsl(var(--color-primary-dark))",
          light: "hsl(var(--color-primary-light))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          dark: "hsl(var(--color-secondary-dark))",
          light: "hsl(var(--color-secondary-light))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--color-success))",
          bg: "hsl(var(--color-success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning))",
          bg: "hsl(var(--color-warning-bg))",
        },
        danger: {
          DEFAULT: "hsl(var(--color-danger))",
          bg: "hsl(var(--color-danger-bg))",
        },
        info: {
          DEFAULT: "hsl(var(--color-info))",
          bg: "hsl(var(--color-info-bg))",
        },
        gray: {
          50: "hsl(var(--gray-50))",
          100: "hsl(var(--gray-100))",
          300: "hsl(var(--gray-300))",
          500: "hsl(var(--gray-500))",
          700: "hsl(var(--gray-700))",
          900: "hsl(var(--gray-900))",
        },
        screensaver: {
          bg: "hsl(var(--screensaver-bg))",
          text: "hsl(var(--screensaver-text))",
          accent: "hsl(var(--screensaver-accent))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        inner: "var(--shadow-inner)",
      },
      zIndex: {
        base: "0",
        card: "10",
        sticky: "20",
        drawer: "30",
        "modal-backdrop": "40",
        modal: "50",
        toast: "60",
        tooltip: "70",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "gentle-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        "progress-ring": {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 300ms ease-out",
        "fade-out": "fade-out 300ms ease-out",
        "slide-in-right": "slide-in-right 500ms cubic-bezier(0, 0, 0.2, 1)",
        "slide-out-right": "slide-out-right 300ms cubic-bezier(0.4, 0, 1, 1)",
        "scale-in": "scale-in 500ms cubic-bezier(0, 0, 0.2, 1)",
        "gentle-pulse": "gentle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "progress-ring": "progress-ring 5s linear forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
