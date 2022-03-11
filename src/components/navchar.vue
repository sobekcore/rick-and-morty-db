<template>
  <section>
    <ul id="keys-list">
      <li>Photo</li>
      <li>Character ID</li>
      <li>Name</li>
      <li>Gender</li>
      <li>Species</li>
      <li>Last Episode</li>
      <li v-if="favorite">Remove from Favorites</li>
      <li v-else>Add to Favorites</li>
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
#keys-list {
  font: 18px "Poppins", sans-serif;
  font-weight: 500;
  list-style-type: none;
  color: $gray-200;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: $gray-100;
  text-align: center;
  padding: 12px 0;
  margin: 0 0 3px 0;

  @media (max-width: $mobile-breakpoint) {
    display: none;
  }
}
</style>
