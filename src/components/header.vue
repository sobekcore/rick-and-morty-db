<template>
  <header>
    <a id="link" title="Rick &#38; Morty Database" href="/">
      <img
        id="logo"
        role="banner"
        alt="Rick &#38; Morty Database"
        src="../assets/rick-and-morty.svg"
      />
    </a>
    <section>
      <input
        id="url"
        :value="searchFilterClean"
        placeholder="Search for characters..."
        v-on:keyup.enter="goToUrl()"
        autocomplete="off"
      />
      <img id="search" title="Search" role="search" src="../assets/search.svg" @click="goToUrl()" />
    </section>
    <p id="text">
      Currently there are <span id="count">{{ count }}</span> characters to choose from.
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    count: {
      type: Number,
    },
  },
  methods: {
    goToUrl: function () {
      let url = (document.getElementById("url") as HTMLInputElement).value;
      window.location.search = "=" + url;
    },
  },
  setup() {
    // Using clean search filter & regex to replace placeholder
    var searchFilter = window.location.search.substr(2);
    var searchFilterClean = searchFilter.replace(/%20/g, " ");

    return { searchFilterClean };
  },
});
</script>

<style scoped lang="scss">
header {
  display: grid;
  grid-template-columns: 380px 500px auto;
  border-bottom: 2px solid $gray-100;
  margin: 0;
  padding: 0;
  text-align: center;
  height: 140px;

  #link {
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

    #url {
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

  #text {
    font: 21px "Poppins", sans-serif;
    color: $gray-200;
    font-weight: 500;
    margin: auto 0;
    padding: 40px 70px;

    #count {
      color: $blue-400;
    }
  }

  @media (max-width: 1319px) {
    grid-template-columns: 1fr;
    height: auto;

    #link {
      #logo {
        margin: 30px auto;
      }
    }

    section {
      margin: 0 20vw;
    }
  }

  @media (max-width: $mobile-breakpoint) {
    section {
      margin: 0 20px;
    }

    #text {
      padding: 40px 20px;
      font-size: 19px;
    }
  }
}
</style>
