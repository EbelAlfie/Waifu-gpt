import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cryo_mist':"#169fc5",
        'cryo_sky':"#1b5b85",
        'cryo_cloud': "#2594b5",
        'cryo_base' : '#19566d',
        'back_light': '#ede5d7',
        'back_hovered': '#c9c2b5',
        'border_icon': '#858486'
      },
    },
  },
  plugins: [],
};
export default config;
