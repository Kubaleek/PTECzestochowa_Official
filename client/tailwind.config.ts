import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      padding: {
        'custom-t': '4px',  // custom top padding
        'custom-r': '12px', // custom right padding
        'custom-b': '5px',  // custom bottom padding
        'custom-l': '12px', // custom left padding
      },
    },
  },
  plugins: [
    
  ],
};
export default config;
