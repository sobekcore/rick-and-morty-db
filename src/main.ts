/* eslint-disable */
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { VueWrapper } from "@vue/test-utils";
import VueApollo from "vue-apollo";

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

// Temporary console log for easier development
const query = gql`{
    characters(page: 1) {
      info {
        pages
      }
      results {
        name
        id
      }
    }
  }
`;

apolloClient.query({
  query
}).then(res => res.data)
.then(res => console.log(res));

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render() {
    return h(App)
  }
}).mount("#app");
