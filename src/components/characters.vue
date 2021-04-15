<template>
  <section>
    <ul>
      <li v-for="character in characters" :key="character.id">
        {{ character.name }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Need to disable TypeScript and ESLint due to relative
// import bug, not sure how to easily fix this without hacks.
// eslint-disable-next-line
// @ts-ignore
import charactersQuery from "../graphql/characters.query.gql";

export default defineComponent({
  name: "Characters",
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  setup(props) {
    // Get current url search filter after ?="", and
    // clean it up by removing spacebar url encoding
    var searchFilter = window.location.search.substr(2);
    var searchFilterClean = searchFilter.replaceAll("%20", " ");

    const { result } = useQuery(charactersQuery, { page: props.page, filter: searchFilterClean });
    const characters = useResult(result, null, (data) => data.characters.results);

    return { characters };
  },
});
</script>

<style scoped lang="scss">
section {
  h2 {
    margin: 20px 0 0;
    font-size: 26px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      background: $blue-400;
      color: black;
      padding: 10px 12px;
      border-radius: 4px;
      margin: 3px 5px;
    }
  }
}
</style>
