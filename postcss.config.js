module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      selectorBlackList: [],
      exclude: [/node_modules/],
    },
  },
}
