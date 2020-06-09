module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = '奇木奇商城';
        return args;
      });
  },

  publicPath: '/chimoochi/',
};
