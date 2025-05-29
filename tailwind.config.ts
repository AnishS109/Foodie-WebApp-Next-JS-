import type { Config } from 'tailwindcss';

/** @type {Config} */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addUtilities } : {addUtilities:any}) => {
      addUtilities({
        ".btn-line-animation": {
          position: "relative",
          display: "inline-block",
        },
        ".btn-line-animation::after": {
          content: '""',
          position: "absolute",
          bottom: "-4px",
          left: 0,
          width: "0%",
          height: "2px",
          backgroundColor: "#ffffff",
          transition: "width 0.3s",
        },
        ".btn-line-animation:hover::after": {
          width: "100%",
        },
      });
    },
  ],
};

export default config;
