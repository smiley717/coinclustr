module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  mode: "jit",
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        coinclustr: {
          "gray-20": "#8A9197",
          "gray-40": "#686D71",
          "gray-30": "#797F84",
          "gray-50": "#575A5F",
          "gray-60": "#45484C",
          "gray-80": "#232426",
          "gray-bordered": "#CED3D7",
          green: "#27AE60",
          yellow: "#F2C94C",
          orange: "#F7931A",
          red: "#EB5757",
          "primary-blue": "#1D66FF",
          "dark-blue": "#0247A5",
          purple: "#6666FF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          padding: "0px 20px",
          "@screen sm": {
            maxWidth: "660px",
          },
          "@screen md": {
            maxWidth: "788px",
          },
          "@screen lg": {
            maxWidth: "1044px",
          },
          "@screen xl": {
            maxWidth: "1044px",
          },
          "@screen 2xl": {
            maxWidth: "1044px",
          },
        },
      });
    },
  ],
};
