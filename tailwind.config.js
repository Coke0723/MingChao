/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0f14",
        mist: "#d8ddd7",
        wave: "#9dd7d2",
        tide: "#5eb7b0",
        ember: "#de9b72",
        "ww-ink": "#07090d",
        "ww-slate": "#141a22",
        "ww-line": "#b9c9d51f",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(157, 215, 210, 0.18), 0 24px 80px rgba(0, 0, 0, 0.45)",
        panel: "0 0 0 1px rgba(214, 226, 233, 0.08), 0 30px 80px rgba(0, 0, 0, 0.38)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Microsoft YaHei", "PingFang SC", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(157,215,210,0.16), transparent 30%), radial-gradient(circle at 80% 0%, rgba(222,155,114,0.15), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.03), transparent 55%)",
        "ww-page":
          "linear-gradient(140deg, rgba(255,255,255,0.03), transparent 18%), radial-gradient(circle at 15% 10%, rgba(201,220,232,0.1), transparent 22%), radial-gradient(circle at 85% 8%, rgba(130,170,195,0.08), transparent 16%), linear-gradient(180deg, #06080d 0%, #0a0e14 42%, #07090d 100%)",
      },
    },
  },
  plugins: [],
};
