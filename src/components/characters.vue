<template>
  <!-- Displaying loading before data is fetched -->
  <div class="load-wrapper" v-if="loading">
    <h2 class="load">Loading characters...</h2>
  </div>

  <section v-else>
    <ul class="char-list">
      <li class="char-item" v-for="character in characters.data" :key="character.id">
        <CharacterComponent
          :character="character"
          :favorite="favorite"
          @saveFavorite="saveFavorite($event)"
          @deleteFavorite="deleteFavorite($event)"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { getSearchedValueFromUrl } from "@/services/search";

import {
  Character,
  getAllCharacters,
  getAllFavoriteCharacters,
  makeCharacterButtonActiveById,
} from "@/services/characters";

import {
  getAllFavoriteCharactersFromStorage,
  removeFavoriteCharacterFromStorage,
  saveFavoriteCharacterToStorage,
} from "@/services/storage";

import CharacterComponent from "@/components/character.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterComponent,
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
  setup(props) {
    if (props.favorite) {
      const favorites: Array<string> = getAllFavoriteCharactersFromStorage();

      const { data, loading } = getAllFavoriteCharacters(favorites);
      const characters = reactive({ data });

      // Get current local storage array and remove certain character from it
      const deleteFavorite = (id: string): void => {
        removeFavoriteCharacterFromStorage(id);

        const filteredData: Array<Character> = characters.data.filter(
          (character: Character) => character.id !== id
        );

        characters.data = computed(() => filteredData);
      };

      return {
        characters,
        loading,
        deleteFavorite,
      };
    } else {
      const searchFilter: string = getSearchedValueFromUrl();

      const { data, loading } = getAllCharacters(props.page, searchFilter);
      const characters = reactive({ data });

      // Get current local storage array and add new character to that
      const saveFavorite = (id: string): void => {
        saveFavoriteCharacterToStorage(id);

        const favorites: Array<string> = getAllFavoriteCharactersFromStorage();

        if (favorites.includes(id)) {
          makeCharacterButtonActiveById(id);
        }
      };

      return {
        characters,
        loading,
        saveFavorite,
      };
    }
  },
});
</script>

<style scoped lang="scss">
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
    }

    @media (max-width: $mobile-breakpoint) {
      margin: 0;
      padding: 12px 0;

      .info-list {
        grid-template-columns: 1fr;
      }
    }
  }
}

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
