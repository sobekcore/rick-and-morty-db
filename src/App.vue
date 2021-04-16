<template>
  <article v-if="information !== null">
    <Navbar :count="information.count" />
    <ul id="navchar-list">
      <li @click="allCharacters">All Characters</li>
      <li @click="favorites">Favorites</li>
    </ul>
    <Navchar />

    <!-- Display either all characters or favorites -->
    <section v-if="showFavorites == true">
      <Suspense>
        <template #default>
          <Characters :favorite="true" />
        </template>
      </Suspense>
    </section>
    <section v-else>
      <div v-for="index in information.pages" :key="index">
        <Suspense>
          <template #default>
            <Characters :page="index" />
          </template>
        </Suspense>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Import Components
import Navbar from "./components/navbar.vue";
import Navchar from "./components/navchar.vue";

// Asynchronous Characters loading
const Characters = defineAsyncComponent({
  loader: () => import("./components/characters.vue" /* webpackChunkName: "characters" */),
  delay: 100,
});

// eslint-disable-next-line
// @ts-ignore
import informationQuery from "./graphql/information.query.gql";

export default defineComponent({
  name: "App",
  components: {
    Characters,
    Navbar,
    Navchar,
  },
  data() {
    return {
      showFavorites: false,
    };
  },
  methods: {
    allCharacters: function () {
      this.$data.showFavorites = false;
    },
    favorites: function () {
      this.$data.showFavorites = true;
    },
  },
  setup() {
    const { result } = useQuery(informationQuery);
    const information = useResult(result, null, (data) => data.characters.info);

    return { information };
  },
});
</script>

<style scope lang="scss">
article {
  #navchar-list {
    font: 18px "Poppins", sans-serif;
    font-weight: 500;
    list-style-type: none;
    color: $gray-200;
    display: flex;
    padding: 0;

    li {
      margin: 7px 21px;
      padding: 3px 9px;
      cursor: pointer;
    }

    @media (max-width: $mobile-breakpoint) {
      justify-content: space-around;
      border-bottom: 2px solid $gray-100;
      padding-bottom: 21px;
      margin-bottom: 0;

      li {
        margin: 7px 0;
      }
    }
  }
}
</style>
