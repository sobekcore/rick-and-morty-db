<template>
  <nav>
    <a title="Rick &#38; Morty Database" href="/">
      <img
        id="logo"
        role="banner"
        alt="Rick &#38; Morty Database"
        src="../assets/rick-and-morty.svg"
      />
    </a>
    <section>
      <input id="url" placeholder="Start typing to search..." v-on:keyup.enter="goToUrl()" />
      <img id="search" title="Search" src="../assets/search.svg" @click="goToUrl()" />
    </section>
    <p>Currently there are {{ count }} characters to choose from.</p>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  props: {
    count: {
      type: Number,
    },
  },
  methods: {
    goToUrl: function () {
      // eslint-disable-next-line
      // @ts-ignore
      var url = document.getElementById("url").value;
      window.location.search = "=" + url;
    },
  },
});
</script>

<!-- Writing it just in case: CSS styling in a lot of places
is done with tags and not with classes/id's thanks to Vue's
scope feature on styling. Normally of course i would do it
fully with classes + id's or BEM or any other methodology. -->
<style scope lang="scss">
nav {
  display: grid;
  grid-template-columns: 380px 500px auto;
  border-bottom: 2px solid $gray-100;
  margin: 0;
  padding: 0;
  text-align: center;
  height: 140px;

  a {
    margin: auto;
    padding: 10px;

    #logo {
      height: 70px;
    }
  }

  section {
    border: 2px solid $gray-200;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 14px;
    font-size: 24px;
    margin: auto 0;

    input {
      font: 18px "Poppins", sans-serif;
      padding: 0px 15px;
      color: $blue-400;
      font-weight: 500;
      margin: 5px;
      width: 100%;
      height: 40px;
      border: none;
      outline: none;

      &::placeholder {
        color: $gray-200;
      }
    }

    #search {
      height: 30px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  p {
    font: 21px "Poppins", sans-serif;
    color: $gray-200;
    font-weight: 500;
    margin: auto 0;
    padding: 30px;
  }

  @media (max-width: 1219px) {
    grid-template-columns: 1fr;
    height: auto;

    #logo {
      margin: 30px auto;
    }
  }
}
</style>
