module.exports = {
  verbose: true,
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  testMatch: ["**/tests/unit/**/*.test.ts"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.gql$": "jest-transform-graphql",
  },
};
