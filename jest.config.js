module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: { "^.+\\.vue$": "vue-jest" },
  testMatch: ["**/tests/unit/**/*.test.ts"],
};
