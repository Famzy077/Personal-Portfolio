import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'small': '320px',  // Custom small screen breakpoint
        'medium': '501px', // Custom medium screen breakpoint
      },
      colors: {
        foreground: "var(--foreground)",
        primary: '#1E293B',
        accent: '#3B82F6',
        background: '#F8FAFC',
      },
    },
  },
  
  plugins: [],
} satisfies Config;
