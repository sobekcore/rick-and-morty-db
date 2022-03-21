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
  margin: 18px 44px;

  @media (max-width: $mobile-breakpoint) {
    border-bottom: 2px solid $white-200;
    padding-bottom: 21px;
    margin: 18px 0 0;
  }

  .navbar-list {
    @include default-small-font;
    display: flex;
    flex-direction: row;
    font-weight: 500;
    list-style-type: none;
    padding: 0;
    margin: 0;

    @media (max-width: $mobile-breakpoint) {
      flex-direction: column;
      align-items: center;
    }

    .navbar-item {
      margin: 7px 21px;
      padding: 3px 9px;
      cursor: pointer;
      transition: 0.25s text-shadow, 0.25s color;

      @media (max-width: $mobile-breakpoint) {
        margin: 7px 0;
      }

      &:hover {
        text-shadow: 0 0 16px $brand-color;
        color: $brand-color;
      }

      &.is-active {
        color: $brand-color;
        border-bottom: 4px solid $brand-color;
      }
    }
  }
}
</style>
