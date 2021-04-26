module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  outputDir: '../web',
  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeDimensions: true }, { removeViewBox: false }],
        },
      });

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // modify the options...
        options.compilerOptions.whitespace = 'preserve';
        return options;
      });
  },
};
