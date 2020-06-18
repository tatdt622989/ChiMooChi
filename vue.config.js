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
  // 這是將bootstrap的variables和mixins導入到所有元件中的方式，讓這些內容可以在各個元件中使用
  css: {
    loaderOptions: {
      scss: {
        // eslint-disable-next-line quotes
        prependData: `@import "~bootstrap/scss/functions";
                      @import "~@/assets/scss/utils/variables"; 
                      @import "~bootstrap/scss/mixins";`,
      },
    },
  },
};
