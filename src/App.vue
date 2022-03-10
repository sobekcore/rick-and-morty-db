<template>
  <article v-if="information">
    <Header :count="information.count" />
    <!-- Render different active tabs depending on which one is open -->
    <nav class="navbar" v-if="showFavorites === true">
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
      <Characters :favorite="true" />
    </section>
    <section v-else>
      <Characters :page="page" :key="page" />
    </section>

    <!-- Rendering pagination buttons depending on page states -->
    <nav class="pagination" v-if="!showFavorites">
      <button class="show-more" @click="showPagination()">Pages...</button>
      <ul class="page-list">
        <!-- Change pages by 1 or all backwards -->
        <li class="page-section">
          <div v-if="page > 1" class="page special" @click="changePage(1)">
            <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
            <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
            <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
          </div>
        </li>
        <li class="page-section">
          <div v-if="page > 1" class="page special" @click="changePage(--page)">
            <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
          </div>
        </li>
        <!-- Change pages by exact number of provided amounts -->
        <li class="page-section" v-for="index in information.pages" :key="index">
          <div class="page" v-if="index === page - 2" @click="changePage(page - 2)">
            {{ index }}
          </div>
          <div class="page" v-if="index === page - 1" @click="changePage(page - 1)">
            {{ index }}
          </div>
          <div class="page active" v-if="index === page">{{ index }}</div>
          <div class="page" v-if="index === page + 1" @click="changePage(page + 1)">
            {{ index }}
          </div>
          <div class="page" v-if="index === page + 2" @click="changePage(page + 2)">
            {{ index }}
          </div>
          <div class="page spread disabled" v-if="index === page + 5">...</div>
          <div class="page" v-if="index === page + 7" @click="changePage(page + 7)">
            {{ index }}
          </div>
        </li>
        <!-- Change pages by 1 or all forwards -->
        <li class="page-section">
          <div v-if="page < information.pages" class="page special" @click="changePage(++page)">
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
          </div>
        </li>
        <li class="page-section">
          <div
            v-if="page < information.pages"
            class="page special"
            @click="changePage(information.pages)"
          >
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
          </div>
          <div v-else class="page special disabled">
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
            <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
          </div>
          <div></div>
        </li>
      </ul>
    </nav>
  </article>

  <!-- Error page when no characters are found -->
  <article v-else-if="!information && error">
    <Error />
  </article>

  <!-- Margin for a pagination fixed div -->
  <div id="pagination-margin" v-if="!showFavorites"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Import Components
import Header from "@/components/header.vue";
import Navchar from "@/components/navchar.vue";
import Characters from "@/components/characters.vue";
import Error from "@/components/error.vue";

import informationQuery from "@/graphql/information.query.gql";

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
      page: 1,
    };
  },
  methods: {
    allCharacters() {
      this.showFavorites = false;
      document.cookie = "showFavorites = false;";
    },
    favorites() {
      this.showFavorites = true;
      document.cookie = "showFavorites = true;";
    },
    changePage(page: number) {
      this.page = page;
    },
    showPagination() {
      // Pagination on mobile toggle
      let show = document.querySelector(".page-list");

      if (show instanceof HTMLUListElement) {
        if (show.className === "page-list") {
          show.className = "page-list active";
        } else {
          show.className = "page-list";
        }
      }
    },
  },
  mounted() {
    // Loads last page visited by user from cookies

    // TODO: Implement proper cookie system to get and set actual cookie values
    this.showFavorites = document.cookie.substr(14) === "true";
  },
  setup() {
    // Get current url search filter after ?="", and
    // clean it up by removing spacebar url encoding
    const searchFilter = window.location.search.substr(2);
    const searchFilterClean = searchFilter.replaceAll("%20", " ");

    // Getting right number of pages
    const { result, error } = useQuery(informationQuery, { filter: searchFilterClean });
    const information = useResult(result, null, (data) => data.characters.info);

    return { information, error };
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
          width: 48px;
          transition: 0.18s box-shadow, 0.25s border;
        }

        .page:not(.disabled):hover {
          box-shadow: 0 0 12px $blue-400;
          border: 2px solid $blue-400;
          cursor: pointer;
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

        .page.disabled {
          filter: brightness(85%) opacity(45%);
        }
      }

      @media (max-width: $tablet-breakpoint) {
        text-align: center;
        margin-left: 0;
      }

      @media (max-width: $mobile-breakpoint) {
        display: none;

        &.active {
          display: block;
          margin-top: 24px;
        }
      }
    }

    .show-more {
      display: none;

      @media (max-width: $mobile-breakpoint) {
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
        cursor: pointer;

        &:hover {
          cursor: pointer;
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
