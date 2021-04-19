<template>
  <article v-if="information">
    <Header :count="information.count" />
    <!-- Render different active tabs depending on which one is open -->
    <nav class="navbar" v-if="showFavorites == true">
      <ul class="navbar-list">
        <li class="navbar-item" @click="allCharacters">All Characters</li>
        <li class="navbar-item active" @click="favorites">Favorites</li>
      </ul>
    </nav>
    <nav class="navbar" v-else>
      <ul class="navbar-list">
        <li class="navbar-item active" @click="allCharacters">All Characters</li>
        <li class="navbar-item" @click="favorites">Favorites</li>
      </ul>
    </nav>
    <!-- If more tabs on navigation add here... -->

    <Navchar :favorite="showFavorites" />
    <!-- Display either all characters or favorites -->
    <section v-if="showFavorites">
      <Suspense>
        <template #default>
          <Characters :favorite="true" />
        </template>
      </Suspense>
    </section>
    <section v-else>
      <Suspense>
        <template #default>
          <Characters :page="page" :key="page" />
        </template>
      </Suspense>
    </section>

    <!-- Rendering pagination buttons depending on page states -->
    <nav class="pagination" v-if="!showFavorites">
      <ul class="page-list">
        <button class="show-more" @click="showPagination()">Pages...</button>
        <!-- Change pages by 1 or all backwards -->
        <li class="page-section">
          <div v-if="page > 1" class="page special" @click="changePage(1)">
            <img class="pointer" src="./assets/pointer.svg" />
            <img class="pointer" src="./assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img class="pointer" src="./assets/pointer-disabled.svg" />
            <img class="pointer" src="./assets/pointer-disabled.svg" />
          </div>
        </li>
        <li class="page-section">
          <div v-if="page > 1" class="page special" @click="changePage(--page)">
            <img class="pointer" src="./assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img class="pointer" src="./assets/pointer-disabled.svg" />
          </div>
        </li>
        <!-- Change pages by exact number of provided amounts -->
        <li class="page-section" v-for="index in information.pages" :key="index">
          <div class="page" v-if="index == page - 2" @click="changePage(page - 2)">
            {{ index }}
          </div>
          <div class="page" v-if="index == page - 1" @click="changePage(page - 1)">
            {{ index }}
          </div>
          <div class="page active" v-if="index == page">{{ index }}</div>
          <div class="page" v-if="index == page + 1" @click="changePage(page + 1)">
            {{ index }}
          </div>
          <div class="page" v-if="index == page + 2" @click="changePage(page + 2)">
            {{ index }}
          </div>
          <div class="page" v-if="index == page + 5" @click="changePage(page + 5)">...</div>
          <div class="page" v-if="index == page + 7" @click="changePage(page + 7)">
            {{ index }}
          </div>
        </li>
        <!-- Change pages by 1 or all forwards -->
        <li class="page-section">
          <div v-if="page < information.pages" class="page special" @click="changePage(++page)">
            <img class="pointer-flip" src="./assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img class="pointer-flip" src="./assets/pointer-disabled.svg" />
          </div>
        </li>
        <li class="page-section">
          <div
            v-if="page < information.pages"
            class="page special"
            @click="changePage(information.pages)"
          >
            <img class="pointer-flip" src="./assets/pointer.svg" />
            <img class="pointer-flip" src="./assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img class="pointer-flip" src="./assets/pointer-disabled.svg" />
            <img class="pointer-flip" src="./assets/pointer-disabled.svg" />
          </div>
        </li>
      </ul>
    </nav>
  </article>

  <!-- Error page when no characters are found -->
  <article v-else-if="!information && loaded">
    <Error />
  </article>

  <!-- Margin for a pagination fixed div -->
  <div id="pagination-margin" v-if="!showFavorites"></div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Import Components
import Header from "./components/header.vue";
import Navchar from "./components/navchar.vue";
import Error from "./components/error.vue";

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
    Error,
  },
  data() {
    return {
      showFavorites: false,
      loaded: false,
      page: 1,
    };
  },
  methods: {
    allCharacters: function () {
      this.showFavorites = false;
      document.cookie = "showFavorites = false;";
    },
    favorites: function () {
      this.showFavorites = true;
      document.cookie = "showFavorites = true;";
    },
    changePage: function (page: number) {
      this.page = page;
    },
    showPagination: function () {
      // Pagination on mobile toggle
      let show = document.getElementsByClassName("show-more");
      if (show[0].className == "show-more") {
        show[0].className = "show-more active";
      } else {
        show[0].className = "show-more";
      }
    },
  },
  mounted() {
    // Loads last page visited by user from cookies
    let bool = document.cookie.substr(14) == "true";
    this.showFavorites = bool;

    // If cant show characters display error after delay
    setTimeout(() => (this.loaded = true), 1400);
  },
  setup() {
    // Get current url search filter after ?="", and
    // clean it up by removing spacebar url encoding
    var searchFilter = window.location.search.substr(2);
    var searchFilterClean = searchFilter.replaceAll("%20", " ");

    // Getting right number of pages
    const { result } = useQuery(informationQuery, { filter: searchFilterClean });
    const information = useResult(result, null, (data) => data.characters.info);

    return { information };
  },
});
</script>

<!-- Writing it just in case: CSS styling in some places is
done with HTML tags and not with classes/id's thanks to Vue's
scope feature on styling. Normally of course i would do it
fully with classes + id's or BEM or any other methodology. -->
<style lang="scss">
article {
  // -- Navbar --
  .navbar {
    .navbar-list {
      font: 18px "Poppins", sans-serif;
      font-weight: 500;
      list-style-type: none;
      color: $gray-200;
      margin: 18px 44px;
      display: flex;
      padding: 0;

      .navbar-item {
        margin: 7px 21px;
        padding: 3px 9px;
        cursor: pointer;
        transition: 0.25s text-shadow, 0.25s color;
      }

      .navbar-item:hover {
        text-shadow: 0 0 16px $blue-400;
        color: $blue-400;
      }

      .navbar-item.active {
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

        .navbar-item {
          margin: 7px 0;
        }
      }
    }
  }

  // -- Pagination --
  .pagination {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    background: white;
    border-top: 2px solid $gray-100;
    padding: 24px 0;

    .page-list {
      list-style-type: none;
      margin: 0 0 0 60px;
      padding: 0;

      .show-more {
        display: none;
      }

      .page-section {
        display: inline-block;
        user-select: none;

        .page {
          margin: 5px;
          padding: 8px 0;
          border-radius: 10px;
          border: 2px solid $gray-200;
          font: 18px "Poppins", sans-serif;
          font-weight: 500;
          color: $gray-200;
          text-align: center;
          cursor: pointer;
          width: 48px;
          transition: 0.18s box-shadow, 0.25s border;
        }

        .page:hover {
          box-shadow: 0 0 12px $blue-400;
          border: 2px solid $blue-400;
        }

        .page.special {
          .pointer {
            transform: translateY(-10%);
          }

          .pointer-flip {
            transform: translateY(-10%) rotate(-180deg);
          }
        }

        .page.active {
          background: $blue-400;
          border: 2px solid $blue-400;
          color: white;
        }
      }

      @media (max-width: 899px) {
        text-align: center;
        margin-left: 0;
      }

      @media (max-width: $mobile-breakpoint) {
        .show-more {
          display: block;
          font: 21px "Poppins", sans-serif;
          color: $blue-400;
          padding: 15px 0;
          width: 100%;
          background: none;
          border: none;
          outline: none;
          margin-top: -24px;
          margin-bottom: -24px;
        }

        .show-more.active {
          margin-bottom: 8px;
        }

        .page-section {
          display: none;
        }

        .show-more.active ~ .page-section {
          display: inline-block;
        }
      }
    }
  }
}

#pagination-margin {
  height: 102px;
  width: 100%;

  @media (max-width: $mobile-breakpoint) {
    height: 57px;
  }
}
</style>
