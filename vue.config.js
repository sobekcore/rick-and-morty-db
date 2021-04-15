module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/globals.scss";',
      },
    },
  },
};
