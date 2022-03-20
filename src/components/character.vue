<template>
  <ul class="info-list" :data-id="character.id">
    <!-- Photo & Status -->
    <li v-if="character.status === Enums.Characters.STATUS_ALIVE" class="info-item image">
      <img alt="Character Image" class="photo" :src="character.image" />
    </li>
    <li v-else-if="character.status === Enums.Characters.STATUS_DEAD" class="info-item image">
      <img alt="Character Image" class="photo grayed" :src="character.image" />
      <img alt="Ribbon" class="ribbon" src="@/assets/ribbon.svg" />
    </li>
    <li v-else-if="character.status === Enums.Characters.TYPE_UNKNOWN" class="info-item image">
      <img alt="Character Image" class="photo grayed" :src="character.image" />
    </li>

    <!-- Character ID -->
    <li class="info-item id">{{ character.id }}</li>

    <!-- Name -->
    <li class="info-item name">{{ character.name }}</li>

    <!-- Gender -->
    <li v-if="character.gender === Enums.Characters.GENDER_MALE" class="info-item gender">
      <img alt="Male" src="@/assets/male.svg" />
      <span>{{ character.gender }}</span>
    </li>
    <li v-else-if="character.gender === Enums.Characters.GENDER_FEMALE" class="info-item gender">
      <img alt="Female" src="@/assets/female.svg" />
      <span>{{ character.gender }}</span>
    </li>
    <li
      v-else-if="character.gender === Enums.Characters.GENDER_GENDERLESS"
      class="info-item gender"
    >
      <img alt="Genderless" class="genderless" src="@/assets/genderless.svg" />
      <span>{{ character.gender }}</span>
    </li>
    <li
      v-else-if="character.gender === Enums.Characters.TYPE_UNKNOWN"
      class="info-item gender capitalize"
    >
      <img alt="Unknown" class="unknown" src="@/assets/unknown.svg" />
      <span>{{ character.gender }}</span>
    </li>

    <!-- Species -->
    <li class="info-item species capitalize">{{ character.species }}</li>

    <!-- Last Episode -->
    <li class="info-item episode">
      {{ character.episode[character.episode.length - 1].episode }}
    </li>

    <!-- Add to Favorites -->
    <li class="info-item favorite">
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
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Characters } from "@/services/enums";
import { getAllFavoriteCharactersFromStorage } from "@/services/storage";
import { makeCharacterButtonActiveById } from "@/services/characters";

export default defineComponent({
  name: "Information",
  emits: ["saveFavorite", "deleteFavorite"],
  props: {
    character: {
      type: Object,
    },
    favorite: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const Enums = { Characters };

    const saveFavorite = (id: string): void => {
      context.emit("saveFavorite", id);
    };

    const deleteFavorite = (id: string): void => {
      context.emit("deleteFavorite", id);
    };

    onMounted((): void => {
      if (props.character && !props.favorite) {
        const favorites: Array<string> = getAllFavoriteCharactersFromStorage();

        if (favorites.includes(props.character.id)) {
          makeCharacterButtonActiveById(props.character.id, true);
        }
      }
    });

    return {
      Enums,
      saveFavorite,
      deleteFavorite,
    };
  },
});
</script>

<style scoped lang="scss">
.info-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font: 18px "Poppins", sans-serif;
  color: $white-300;
  list-style-type: none;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;

  @media (max-width: $mobile-breakpoint) {
    grid-template-columns: 1fr;
  }

  .info-item {
    &.image {
      position: relative;

      .photo {
        display: block;
        border-radius: 10px;
        height: 80px;
        margin: auto;
      }

      .ribbon {
        position: absolute;
        transform: translateX(28px);
        top: -3px;
      }
    }

    &.gender {
      img {
        transform: translate(-3px, 5px);
      }

      .genderless {
        transform: translate(-5px, 1px);
        margin-left: 5px;
      }

      .unknown {
        transform: translate(-5px, -5px);
        margin-left: 5px;
      }
    }

    .is-favorite,
    .already-favorite {
      height: 46px;
      min-width: 47px;
      padding: 10px;
      border: 2px solid $brand-color;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s transform;
    }

    .is-favorite {
      background: $white-50;
    }

    .already-favorite {
      background: $brand-color;
    }

    .is-favorite.is-active {
      animation: 0.9s fillBlue;
      animation-fill-mode: forwards;
    }

    .is-favorite.is-active-on-boot {
      animation: 0s fillBlue;
      animation-fill-mode: forwards;
    }

    .is-favorite:hover,
    .already-favorite:hover {
      transform: scale(1.25);
    }

    // Mobile replacements for hidden Navchar component
    @media (max-width: $mobile-breakpoint) {
      &.id::before {
        content: "#";
      }

      &.image {
        margin: 10px 0;
      }

      &.id {
        order: -2;
        font-size: 23px;
        margin-left: 12px;
        display: flex;
        width: auto;
      }

      &.name {
        order: -1;
        font-size: 21px;
        margin: -33px 80px 0;
        word-wrap: break-word;
      }

      &.gender::before {
        content: "Gender: ";
      }

      &.species::before {
        content: "Species: ";
      }

      &.episode::before {
        content: "Last episode: ";
      }

      &.favorite::before {
        content: "Favorite?";
        margin: 10px 0 6px;
        display: block;
      }
    }
  }
}

@keyframes fillBlue {
  0% {
    background: $white-50;
    content: url("~@/assets/favorite.svg");
  }
  100% {
    background: $brand-color;
    content: url("~@/assets/already-favorite.svg");
  }
}
</style>
