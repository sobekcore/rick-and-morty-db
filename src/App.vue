<template>
  <article v-if="information !== null">
    <Header :count="information.count" />
    <nav v-if="showFavorites == true">
      <ul id="navchar-list">
        <li @click="allCharacters">All Characters</li>
        <li class="active" @click="favorites">Favorites</li>
      </ul>
    </nav>
    <nav v-else>
      <ul id="navchar-list">
        <li class="active" @click="allCharacters">All Characters</li>
        <li @click="favorites">Favorites</li>
      </ul>
    </nav>
    <!-- If more tabs on navigation add here... -->

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
      <!-- If pagination is a must, delete this loop and simply
      pass in page number by buttons clicks with methods -->
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
import Header from "./components/header.vue";
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
    Header,
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

<!-- Writing it just in case: CSS styling in a lot of places
is done with tags and not with classes/id's thanks to Vue's
scope feature on styling. Normally of course i would do it
fully with classes + id's or BEM or any other methodology. -->
<style scope lang="scss">
article {
  nav {
    #navchar-list {
      font: 18px "Poppins", sans-serif;
      font-weight: 500;
      list-style-type: none;
      color: $gray-200;
      margin: 18px 44px;
      display: flex;
      padding: 0;

      li {
        margin: 7px 21px;
        padding: 3px 9px;
        cursor: pointer;
      }

      li.active {
        color: $blue-400;
        border-bottom: 4px solid $blue-400;
      }

      @media (max-width: $mobile-breakpoint) {
        // Navbar column direction in case of
        // adding more tabs to the navigation
        flex-direction: column;
        align-items: center;
        border-bottom: 2px solid $gray-100;
        padding-bottom: 21px;
        margin: 18px 0 0 0;

        li {
          margin: 7px 0;
        }
      }
    }
  }
}
</style>
