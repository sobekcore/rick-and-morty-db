<template>
  <section class="navchar">
    <ul class="navchar-list">
      <li class="photo">Photo</li>
      <li class="id">Character ID</li>
      <li class="name">Name</li>
      <li class="gender">Gender</li>
      <li class="species">Species</li>
      <li class="last-episode">Last Episode</li>
      <li v-if="favorite" class="favorites">Remove from Favorites</li>
      <li v-else class="favorites">Add to Favorites</li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navchar",
  props: {
    favorite: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.navchar {
  .navchar-list {
    @include default-small-font;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: 500;
    text-align: center;
    list-style-type: none;
    background: $white-200;
    padding: 12px 0;
    margin: 0;

    @media (max-width: $mobile-breakpoint) {
      display: none;
    }
  }
}
</style>
