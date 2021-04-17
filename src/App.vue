<template>
  <article v-if="information !== null">
    <Header :count="information.count" />
    <nav v-if="showFavorites == true">
      <ul class="navbar-list">
        <li @click="allCharacters">All Characters</li>
        <li class="active" @click="favorites">Favorites</li>
      </ul>
    </nav>
    <nav v-else>
      <ul class="navbar-list">
        <li class="active" @click="allCharacters">All Characters</li>
        <li @click="favorites">Favorites</li>
      </ul>
    </nav>
    <!-- If more tabs on navigation add here... -->

    <Navchar />
    <h2 class="load" v-if="!showFavorites">Loading characters...</h2>
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
      document.cookie = "showFavorites = false;";
    },
    favorites: function () {
      this.$data.showFavorites = true;
      document.cookie = "showFavorites = true;";
    },
  },
  mounted() {
    // Loads last page visited by user from cookies
    let bool = document.cookie.substr(14) == "true";
    this.$data.showFavorites = bool;

    // Displaying loading of characters
    if (!this.showFavorites) {
      setTimeout(() => (document.getElementsByClassName("load")[0].className += " out"), 3500);
    }
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
    .navbar-list {
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
        transition: 0.25s text-shadow, 0.25s transform;
      }

      li:hover {
        text-shadow: 0 0 14px $blue-400;
        transform: rotate(-6deg);
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

  .load {
    position: absolute;
    font: 21px "Poppins", sans-serif;
    font-weight: 500;
    color: $gray-200;
    left: 50%;
    padding-top: 30px;
    transform: translateX(-50%);
    z-index: -1;
    user-select: none;
  }

  .load.out {
    animation: 0.6s fadeOut;
    animation-fill-mode: forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
}
</style>
