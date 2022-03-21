<template>
  <ul class="info-list" :data-id="character.id">
    <!-- Photo & Status -->
    <li class="info-item image centered">
      <div v-if="character.status === Enums.Characters.STATUS_ALIVE" class="photo-wrapper">
        <img alt="Character Image" class="photo" :src="character.image" />
      </div>
      <div v-else-if="character.status === Enums.Characters.STATUS_DEAD" class="photo-wrapper">
        <img alt="Character Image" class="photo grayed" :src="character.image" />
        <img alt="Ribbon" class="ribbon" src="@/assets/ribbon.svg" />
      </div>
      <div v-else-if="character.status === Enums.Characters.TYPE_UNKNOWN" class="photo-wrapper">
        <img alt="Character Image" class="photo grayed" :src="character.image" />
      </div>
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
    <li class="info-item favorite centered">
      <img
        v-if="favorite"
        alt="Remove from favorites"
        title="Remove from favorites"
        role="button"
        class="already-favorite"
        src="@/assets/already-favorite.svg"
        @click="deleteFavorite(character.id)"
      />
      <img
        v-else
        alt="Add to favorites"
        title="Add to favorites"
        role="button"
        class="is-favorite"
        src="@/assets/favorite.svg"
        @click="saveFavorite(character.id)"
      />
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
  @include default-small-font;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
      .photo-wrapper {
        position: relative;

        .photo {
          display: block;
          border-radius: 10px;
          height: 80px;
        }

        .ribbon {
          position: absolute;
          right: -5px;
          top: -3px;
        }
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

    &.favorite {
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
        animation: 0.9s fill-blue;
        animation-fill-mode: forwards;
      }

      .is-favorite.is-active-on-boot {
        animation: 0s fill-blue;
        animation-fill-mode: forwards;
      }

      .is-favorite:hover,
      .already-favorite:hover {
        transform: scale(1.25);
      }
    }

    // Mobile replacements for hidden Navchar component
    @media (max-width: $mobile-breakpoint) {
      &.image {
        margin: 10px 0;
      }

      &.id {
        order: -2;
        font-size: 23px;
        margin-left: 12px;
        display: flex;
        width: auto;

        &::before {
          content: "#";
        }
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

      &.favorite {
        display: block;

        &::before {
          content: "Favorite?";
          margin: 10px 0 6px;
          display: block;
        }
      }
    }
  }
}

@keyframes fill-blue {
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
