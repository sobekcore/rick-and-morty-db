<template>
  <!-- Error page when no characters are found -->
  <article v-if="error">
    <Error :message="error.message" />
  </article>

  <!-- Render default characters table view instead -->
  <article v-else-if="information">
    <Header :count="information.count" />
    <Navbar :showFavorites="showFavorites" @showFavorites="setShowFavorites($event)" />

    <Navchar :favorite="showFavorites" />
    <section v-if="showFavorites">
      <Characters :favorite="true" />
    </section>
    <section v-else>
      <Characters :page="page" :key="page" />
    </section>

    <Pagination :information="information" :showFavorites="showFavorites" @page="setPage($event)" />
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Import Components
import Header from "@/components/header.vue";
import Navbar from "@/components/navbar.vue";
import Navchar from "@/components/navchar.vue";
import Characters from "@/components/characters.vue";
import Pagination from "@/components/pagination.vue";
import Error from "@/components/error.vue";

import informationQuery from "@/graphql/information.query.gql";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Navbar,
    Navchar,
    Characters,
    Pagination,
    Error,
  },
  setup() {
    // Page reactive value and setter
    const page = ref(1);
    const setPage = (target: number) => {
      page.value = target;
    };

    // Show favorites reactive value and setter
    // TODO: Implement proper cookie system to get and set actual cookie values
    const showFavorites = ref(document.cookie.substr(14) === "true");
    const setShowFavorites = (show: boolean) => {
      showFavorites.value = show;
      document.cookie = `showFavorites = ${show};`;
    };

    // Get current url search filter after ?="", and clean it up by removing space bar url encoding
    const searchFilter = window.location.search.substr(2);
    const searchFilterClean = searchFilter.replaceAll("%20", " ");

    // Getting right number of pages
    const { result, error } = useQuery(informationQuery, { filter: searchFilterClean });
    const information = useResult(result, null, (data) => data.characters.info);

    return {
      page,
      setPage,
      showFavorites,
      setShowFavorites,
      information,
      error,
    };
  },
});
</script>

<style lang="scss">
// Empty style tag needs to be defined to prevent styles "scoped" functionality across
// whole application which results in not applying global styles onto child components.
</style>
