<template>
  <section v-if="loaded == false">
    <div id="load-wrapper">
      <h2>Loading characters chunk...</h2>
    </div>
  </section>
  <section v-else>
    <ul class="char-list">
      <li class="char-item" v-for="character in characters" :key="character.id">
        <ul class="info-list">
          <li class="info-item"><img alt="Character Image" id="photo" :src="character.image" /></li>
          <li class="info-item id">{{ character.id }}</li>
          <li class="info-item name">{{ character.name }}</li>
          <li class="info-item">{{ character.gender }}</li>
          <li class="info-item">{{ character.species }}</li>
          <li class="info-item episode">
            {{ character.episode[character.episode.length - 1].episode }}
          </li>
          <li class="info-item favorite">
            <img
              title="Add to favorites"
              role="button"
              id="favorite"
              src="../assets/favorite.svg"
              @click="saveFavorite(character.id)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Need to disable TypeScript and ESLint due to relative
// import bug, not sure how to easily fix this without hacks.

/* eslint-disable */
// @ts-ignore
import charactersQuery from "../graphql/characters.query.gql";
// @ts-ignore
import favoritesQuery from "../graphql/favorites.query.gql";
/* eslint-enable */

export default defineComponent({
  name: "Characters",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    saveFavorite: function (id: string) {
      localStorage.setItem("fav-char-" + id, id);
      this.loaded = true;
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    // I didnt want to make it over complicated in just a simple animation in
    // a recruitment task, but ideally of course you'd want to make run animation
    // untill DOM is fully loaded, not in hard coded value delay.
    setTimeout(() => {
      this.loaded = true;
    }, 1800);
  },
  async setup(props) {
    // Get current url search filter after ?="", and
    // clean it up by removing spacebar url encoding
    var searchFilter = window.location.search.substr(2);
    var searchFilterClean = searchFilter.replaceAll("%20", " ");

    if (props.favorite == true) {
      // Show favorite characters
      let array = [];
      for (var i = 0; i <= window.localStorage.length; i++) {
        let favorites = Number(localStorage.getItem("fav-char-" + i));
        array.push(favorites);
      }

      const { result } = useQuery(favoritesQuery, { favorite: array });
      const characters = useResult(result, null, (data) => data.charactersByIds);

      return { characters };
    } else {
      // Show all characters
      const { result } = useQuery(charactersQuery, { page: props.page, filter: searchFilterClean });
      const characters = useResult(result, null, (data) => data.characters.results);

      return { characters };
    }
  },
});
</script>

<style scoped lang="scss">
section {
  #load-wrapper {
    border-bottom: 2px solid $gray-100;
    padding: 37px 0px;

    h2 {
      font: 18px "Poppins", sans-serif;
      color: $gray-200;
      text-align: center;
      margin: 0;
      animation: 0.6s fadeOut;
      animation-delay: 1100ms;
      animation-fill-mode: forwards;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .char-list {
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    padding: 0;
    margin: 0;

    .char-item {
      border-bottom: 2px solid $gray-100;
      margin: 3px 0;
      padding: 4px 0;

      .info-list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        font: 18px "Poppins", sans-serif;
        color: $gray-200;
        list-style-type: none;
        align-items: center;
        text-align: center;
        padding: 0;

        .info-item {
          #photo {
            height: 80px;
            border-radius: 10px;
          }

          #favorite {
            height: 46px;
            padding: 10px;
            border: 2px solid $blue-400;
            border-radius: 8px;
            cursor: pointer;
          }
        }
      }

      @media (max-width: $mobile-breakpoint) {
        margin: 0;
        padding: 12px 0;

        .info-list {
          grid-template-columns: 1fr;

          .info-item.id::before {
            content: "#";
          }

          .info-item.id {
            grid-row: 2 span / 3;
            font-size: 23px;
            margin-left: 12px;
            display: flex;
            width: auto;
          }

          .info-item.name {
            grid-row: 1 span / 4;
            margin: -33px 80px 10px 80px;
            font-size: 21px;
            word-wrap: break-word;
          }

          .info-item.episode::before {
            content: "Last episode: ";
          }

          .info-item.favorite::before {
            content: "Favorite?";
            display: block;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
