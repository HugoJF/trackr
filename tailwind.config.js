module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
