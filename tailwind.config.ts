import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "base": "var(--bg-color)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        diy: {
          base: 'var(--color-text-base)'
        }
      }

    },
  },
  plugins: [
    plugin(({ addComponents,theme }) => {
      addComponents({
        '.headerCard':{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          borderRadius: '0 0 2rem 2rem',
          backdropFilter: 'blur(0.2rem)',
          backgroundColor: 'rgba(229, 225, 218 0.04)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 1rem 3rem 3rem',
        },
       
      })
    })
  ],
};
export default config;
