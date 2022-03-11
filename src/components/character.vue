<template>
  <ul class="info-list">
    <!-- Photo & Status -->
    <li v-if="character.status === 'Alive'" class="info-item">
      <img alt="Character Image" class="photo" :src="character.image" />
    </li>
    <li v-else class="info-item">
      <img alt="Character Image" class="photo dead" :src="character.image" />
      <img alt="Ribbon" class="ribbon" src="@/assets/ribbon.svg" />
    </li>

    <!-- Character ID -->
    <li class="info-item id">{{ character.id }}</li>

    <!-- Name -->
    <li class="info-item name">{{ character.name }}</li>

    <!-- Gender -->
    <li v-if="character.gender === 'Male'" class="info-item gender">
      <img alt="Male" src="@/assets/male.svg" />{{ character.gender }}
    </li>
    <li v-else-if="character.gender === 'Female'" class="info-item gender">
      <img alt="Female" src="@/assets/female.svg" />{{ character.gender }}
    </li>
    <li v-else-if="character.gender === 'Genderless'" class="info-item gender">
      <img alt="Genderless" class="genderless" src="@/assets/genderless.svg" />
      {{ character.gender }}
    </li>
    <li v-else class="info-item gender capitalize">
      <img alt="Unknown" class="unknown" src="@/assets/unknown.svg" />{{ character.gender }}
    </li>

    <!-- Species -->
    <li class="info-item species">{{ character.species }}</li>

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
import { defineComponent } from "vue";

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
  methods: {
    saveFavorite(id: string) {
      this.$emit("saveFavorite", id);
    },
    deleteFavorite(id: string) {
      this.$emit("deleteFavorite", id);
    },
  },
});
</script>

<style scoped lang="scss">
// Changing offsets of gender svg's
.info-item.gender {
  img {
    transform: translate(-3px, 5px);
  }

  .genderless {
    transform: translate(-5px, 1px);
  }

  .unknown {
    transform: translate(-5px, -5px);
  }

  .info-item.gender.capitalize {
    text-transform: capitalize;
  }
}

// Characters details
.info-item {
  .photo {
    height: 80px;
    border-radius: 10px;
  }

  .ribbon {
    position: absolute;
    transform: translate(-12px, -3px);
  }

  .photo.dead {
    filter: grayscale(100%) contrast(0.6) brightness(1.2);
  }

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

  .is-favorite.is-active {
    animation: 0.9s fillBlue;
    animation-fill-mode: forwards;
  }

  .already-favorite {
    background: $blue-400;
  }

  .is-favorite:hover,
  .already-favorite:hover {
    transform: scale(1.25);
  }
}

@media (max-width: $mobile-breakpoint) {
  .info-item.id::before {
    content: "#";
  }

  .info-item.id {
    order: -2;
    font-size: 23px;
    margin-left: 12px;
    display: flex;
    width: auto;
  }

  .info-item.name {
    order: -1;
    margin: -33px 80px 12px;
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
</style>
