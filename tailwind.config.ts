// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class", "variant"],
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./providers/**/*.{ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
