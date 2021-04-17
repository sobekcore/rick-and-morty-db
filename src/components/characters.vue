<template>
  <section>
    <ul class="char-list">
      <li class="char-item" v-for="character in characters" :key="character.id">
        <ul class="info-list">
          <li class="info-item">
            <img alt="Character Image" class="photo" :src="character.image" />
          </li>
          <li class="info-item id">{{ character.id }}</li>
          <li class="info-item name">{{ character.name }}</li>
          <li class="info-item gender">{{ character.gender }}</li>
          <li class="info-item species">{{ character.species }}</li>
          <li class="info-item episode">
            {{ character.episode[character.episode.length - 1].episode }}
          </li>
          <li class="info-item favorite">
            <!-- Render different button depending if its favorite or not -->
            <div v-if="favorite">
              <img
                title="Remove from favorites"
                role="button"
                class="already-favorite"
                src="../assets/already-favorite.svg"
                @click="deleteFavorite(character.id)"
              />
            </div>
            <div v-else>
              <img
                title="Add to favorites"
                role="button"
                class="is-favorite"
                src="../assets/favorite.svg"
                @click="saveFavorite(character.id)"
              />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <h2 class="removed">Removed</h2>
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
      // Get current local storage array and add new character to that

      // Removing possibility of duplicates in a array
      // eslint-disable-next-line
      let array = [...new Set(JSON.parse(localStorage.getItem("rnmdb-favorite-characters")!))];
      array.push(id);
      localStorage.setItem("rnmdb-favorite-characters", JSON.stringify(array));

      // Calculations on which button to animate
      let ids = document.getElementsByClassName("info-item id");
      for (var i = 0; i <= ids.length - 1; i++) {
        var choosed = ids[i].innerHTML;

        if (choosed == id) {
          break;
        }
      }

      let fav = document.getElementsByClassName("is-favorite");
      fav[i].setAttribute("title", "Already favorite");
      fav[i].className += " active";
    },
    deleteFavorite: function (id: string) {
      // Get current local storage array and remove certain character from it
      // eslint-disable-next-line
      let array = JSON.parse(localStorage.getItem("rnmdb-favorite-characters")!);

      let index = array.indexOf(id);
      if (index > -1) {
        array.splice(index, 1);
      }

      localStorage.setItem("rnmdb-favorite-characters", JSON.stringify(array));

      // Making tricky calculations on which button to scale
      let ids = document.getElementsByClassName("info-item id");
      for (var i = 0; i <= ids.length - 1; i++) {
        var choosed = ids[i].innerHTML;

        if (choosed == id) {
          break;
        }
      }

      let fav = document.getElementsByClassName("already-favorite");
      fav[i].className += " delete";
      let removed = document.getElementsByClassName("removed");
      removed[0].className += " show";

      setTimeout(() => {
        location.reload();
      }, 2100);
    },
  },
  async setup(props) {
    if (props.favorite == true) {
      // Show favorite characters
      // eslint-disable-next-line
      let favorites = JSON.parse(localStorage.getItem("rnmdb-favorite-characters")!);

      const { result } = useQuery(favoritesQuery, { favorite: favorites });
      const characters = useResult(result, null, (data) => data.charactersByIds);

      return { characters };
    } else {
      // Get current url search filter after ?="", and
      // clean it up by removing spacebar url encoding
      var searchFilter = window.location.search.substr(2);
      var searchFilterClean = searchFilter.replaceAll("%20", " ");

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
          .photo {
            height: 80px;
            border-radius: 10px;
          }

          .is-favorite,
          .already-favorite {
            height: 46px;
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
              content: url("../assets/favorite.svg");
            }
            100% {
              background: $blue-400;
              content: url("../assets/already-favorite.svg");
            }
          }

          .already-favorite {
            background: $blue-400;
          }

          .already-favorite.delete {
            transition: 4s transform;
            margin-left: -24px;
            margin-top: -27px;
            position: fixed;
            transform: scale(600);
            animation-timing-function: ease-in;
            z-index: 99;
            pointer-events: none;
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
            margin: -33px 80px 12px 80px;
            font-size: 21px;
            word-wrap: break-word;
          }

          // Adding keys to values on mobile for clarity
          .info-item.gender::before {
            content: "Gender: ";
          }

          .info-item.species::before {
            content: "Species: ";
          }

          .info-item.episode::before {
            content: "Last episode: ";
          }

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

.load-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid $gray-100;
  height: 103px;
  width: 100%;

  .load {
    font: 19px "Poppins", sans-serif;
    color: $gray-200;
    margin: 0;
  }
}

.removed {
  display: none;
  opacity: 0;
  margin: 0;
}

.removed.show {
  font: 44px "Poppins", sans-serif;
  color: rgb(209, 74, 74);
  font-weight: 500;
  display: block;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: 2.4s fadeIn;
  animation-direction: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
