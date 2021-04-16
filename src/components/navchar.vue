<template>
  <section>
    <ul id="keys-list">
      <li>Photo</li>
      <li>Character ID</li>
      <li>Name</li>
      <li>Gender</li>
      <li>Species</li>
      <li>Last Episode</li>
      <li>Add To Favorites</li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navchar",
});
</script>

<style scope lang="scss">
section {
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
    margin: 0;

    @media (max-width: $mobile-breakpoint) {
      display: none;
    }
  }
}
</style>
