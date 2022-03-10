<template>
  <!-- Displaying loading before data is fetched -->
  <div class="load-wrapper" v-if="loading">
    <h2 class="load">Loading characters...</h2>
  </div>
  <section v-else>
    <ul class="char-list">
      <li class="char-item" v-for="character in characters.data" :key="character.id">
        <ul class="info-list">
          <CharInfo :character="character" />
          <!-- Add to Favorites -->
          <li class="info-item favorite">
            <!-- Render different button depending if its favorite or not -->
            <div v-if="favorite">
              <img
                alt="Remove from favorites"
                title="Remove from favorites"
                role="button"
                class="already-favorite"
                src="@/assets/already-favorite.svg"
                @click="deleteFavorite(character.id)"
              />
            </div>
            <div v-else>
              <img
                alt="Add to favorites"
                title="Add to favorites"
                role="button"
                class="is-favorite"
                src="@/assets/favorite.svg"
                @click="saveFavorite(character.id)"
              />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

import CharInfo from "@/components/char-info.vue";

import charactersQuery from "@/graphql/characters.query.gql";
import favoritesQuery from "@/graphql/favorites.query.gql";

export default defineComponent({
  name: "Characters",
  components: {
    CharInfo,
  },
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
    saveFavorite(id: string) {
      // Get current local storage array and add new character to that

      // Removing possibility of duplicates in a favorites array
      const storage = String(localStorage.getItem("rnmdb-favorite-characters"));
      let array = Array.from(new Set(JSON.parse(storage)));

      array.push(id);
      localStorage.setItem("rnmdb-favorite-characters", JSON.stringify(Array.from(new Set(array))));

      let buttonIdToChange = 0;

      // Calculations on which button to animate
      let ids = document.getElementsByClassName("info-item id");
      for (let i = 0; i <= ids.length - 1; i++) {
        let chosen = ids[i].innerHTML;
        buttonIdToChange = i;
        if (chosen === id) break;
      }

      let fav = document.getElementsByClassName("is-favorite");
      fav[buttonIdToChange].setAttribute("title", "Already favorite");
      fav[buttonIdToChange].className += " active";
    },
    deleteFavorite(id: string) {
      // Get current local storage array and remove certain character from it
      const storage = String(localStorage.getItem("rnmdb-favorite-characters"));
      let array = JSON.parse(storage);

      let index = array.indexOf(id);
      if (index !== -1) array.splice(index, 1);

      localStorage.setItem("rnmdb-favorite-characters", JSON.stringify(array));

      // Making tricky calculations on which button to animate
      let ids = document.getElementsByClassName("info-item id");
      for (let i = 0; i <= ids.length - 1; i++) {
        let chosen = ids[i].innerHTML;
        if (chosen === id) break;
      }

      if (this.removeFavoriteCharacter instanceof Function) {
        this.removeFavoriteCharacter(id);
      }
    },
  },
  setup(props) {
    if (props.favorite === true) {
      const storage = String(localStorage.getItem("rnmdb-favorite-characters"));
      const favorites = JSON.parse(storage);

      // Show favorite characters
      const { result, loading } = useQuery(favoritesQuery, {
        favorite: favorites,
      });

      const characters = reactive({
        data: useResult(result, null, (data) => data.charactersByIds),
      });

      const removeFavoriteCharacter = (id: string) => {
        // TODO: Implement proper Character type and use it throughout the project
        const filteredData = characters.data.filter((character: any) => character.id !== id);
        characters.data = computed(() => filteredData);
      };

      return { characters, loading, removeFavoriteCharacter };
    } else {
      // Get current url search filter
      const searchFilter = window.location.search.substr(2);
      const searchFilterClean = searchFilter.replaceAll("%20", " ");

      // Show all characters
      const { result, loading } = useQuery(charactersQuery, {
        page: props.page,
        filter: searchFilterClean,
      });

      const characters = reactive({
        data: useResult(result, null, (data) => data.characters.results),
      });

      return { characters, loading };
    }
  },
});
</script>

<style scoped lang="scss">
section {
  // -- Characters --
  .char-list {
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    padding: 0;
    margin: 0;

    .char-item {
      border-bottom: 2px solid $gray-100;
      background: white;
      max-width: 100%;
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
          // Diferent styling on favorite buttons depending on location
          .is-favorite,
          .already-favorite {
            height: 46px;
            min-width: 47px;
            padding: 10px;
            border: 2px solid $blue-400;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.2s transform;
          }

          .is-favorite.active {
            animation: 0.9s fillBlue;
            animation-fill-mode: forwards;
          }

          @keyframes fillBlue {
            0% {
              background: white;
              content: url("~@/assets/favorite.svg");
            }
            100% {
              background: $blue-400;
              content: url("~@/assets/already-favorite.svg");
            }
          }

          .already-favorite {
            background: $blue-400;
          }

          .is-favorite:hover,
          .already-favorite:hover {
            transform: scale(1.25);
          }
        }
      }

      @media (max-width: $mobile-breakpoint) {
        margin: 0;
        padding: 12px 0;

        .info-list {
          grid-template-columns: 1fr;

          .info-item.favorite::before {
            content: "Favorite?";
            line-height: 34px;
            display: block;
            margin-top: 10px;
          }
        }
      }
    }
  }
}

// -- Loading --
.load-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid $gray-100;
  height: 100px;
  width: 100%;

  .load {
    font: 19px "Poppins", sans-serif;
    color: $gray-200;
    padding: 0;
  }
}
</style>
