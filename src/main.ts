/* eslint-disable */
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { VueWrapper } from "@vue/test-utils";

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render() {
    return h(App)
  }
}).mount("#app");
