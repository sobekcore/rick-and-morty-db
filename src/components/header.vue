<template>
  <header role="banner" class="header">
    <a class="link" title="Rick &#38; Morty Database" href="/">
      <img class="logo" src="@/assets/rick-and-morty.svg" alt="Rick &#38; Morty Database" />
    </a>
    <section class="search-section">
      <input
        class="url"
        ref="search"
        :value="searchFilter"
        placeholder="Search for characters..."
        @keyup.enter="goToUrlWithQuery"
        autocomplete="off"
      />
      <img
        role="button"
        class="search"
        alt="Search"
        title="Search"
        src="@/assets/search.svg"
        @click="goToUrlWithQuery"
      />
    </section>
    <p class="text">
      Currently there are <span class="count">{{ count }}</span> characters to choose from.
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { Search } from "@/services/enums";
import { getSearchedValueFromUrl } from "@/services/search";

export default defineComponent({
  name: "Header",
  props: {
    count: {
      type: Number,
    },
  },
  setup() {
    const search: Ref<HTMLElement | null> = ref(null);

    const goToUrlWithQuery = (): void => {
      const searchElement: HTMLElement | null = search.value;

      if (searchElement instanceof HTMLInputElement) {
        window.location.search = Search.QUERY_SUFFIX_FULL + searchElement.value;
      }
    };

    // Using cleaned search filter to replace input value
    const searchFilter: string = getSearchedValueFromUrl();

    return {
      search,
      goToUrlWithQuery,
      searchFilter,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 380px 500px auto;
  border-bottom: 2px solid $white-200;
  text-align: center;
  height: 140px;

  @media (max-width: $desktop-breakpoint) {
    grid-template-columns: 1fr;
    height: auto;
  }

  .link {
    margin: auto;
    padding: 10px;

    .logo {
      height: 70px;

      @media (max-width: $desktop-breakpoint) {
        margin: 30px auto;
      }
    }
  }

  .search-section {
    display: flex;
    align-items: center;
    border: 2px solid $white-300;
    border-radius: 14px;
    font-size: 24px;
    margin: auto 0;
    height: 50px;

    @media (max-width: $desktop-breakpoint) {
      margin: 0 auto;
      max-width: 550px;
      width: 100%;
    }

    @media (max-width: $mobile-breakpoint) {
      margin: 0 10vw;
      max-width: initial;
      width: auto;
    }

    .url {
      @include default-small-font($brand-color);
      font-weight: 500;
      padding: 0 14px;
      margin: 5px;
      width: 100%;
      height: 40px;
      border: none;
      outline: none;

      &::placeholder {
        color: $white-300;
      }
    }

    .search {
      height: 30px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .text {
    @include default-big-font;
    font-weight: 500;
    margin: auto 0;
    padding: 40px 70px;

    @media (max-width: $mobile-breakpoint) {
      padding: 40px 20px;
      font-size: 18px;
    }

    .count {
      color: $brand-color;
    }
  }
}
</style>
