<template>
  <section>
    <ul id="navchar-list">
      <li>All Characters</li>
      <li>Favorites</li>
    </ul>
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
  #navchar-list,
  #keys-list {
    font: 18px "Poppins", sans-serif;
    font-weight: 500;
    list-style-type: none;
    color: $gray-200;
  }

  #navchar-list {
    display: flex;
    padding: 0;

    li {
      margin: 7px 21px;
      padding: 3px 9px;
      cursor: pointer;
    }
  }

  #keys-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: $gray-100;
    text-align: center;
    padding: 12px 0;
    margin: 0;
  }

  @media (max-width: $mobile-breakpoint) {
    #navchar-list {
      justify-content: space-around;
      border-bottom: 2px solid $gray-100;
      padding-bottom: 21px;
      margin-bottom: 0;

      li {
        margin: 7px 0;
      }
    }

    #keys-list {
      display: none;
    }
  }
}
</style>
