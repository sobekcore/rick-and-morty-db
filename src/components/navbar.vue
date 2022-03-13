<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li
        :class="['navbar-item', !showFavorites ? 'is-active' : '']"
        @click="setShowFavorites(false)"
      >
        <span>All Characters</span>
      </li>
      <li
        :class="['navbar-item', showFavorites ? 'is-active' : '']"
        @click="setShowFavorites(true)"
      >
        <span>Favorites</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  emits: ["showFavorites"],
  props: {
    showFavorites: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const setShowFavorites = (show: boolean): void => {
      context.emit("showFavorites", show);
    };

    return {
      setShowFavorites,
    };
  },
});
</script>

<style scoped lang="scss">
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

    .navbar-item.is-active {
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
</style>
