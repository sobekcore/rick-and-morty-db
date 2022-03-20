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
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/globals.scss";
          @import "@/styles/helpers.scss";
        `,
      },
    },
  },
};
