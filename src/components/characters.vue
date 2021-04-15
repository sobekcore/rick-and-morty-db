<template>
  <section>
    <ul class="char-list">
      <li class="char-item" v-for="character in characters" :key="character.id">
        <ul class="info-list">
          <li class="info-item"><img alt="Character Image" id="photo" :src="character.image" /></li>
          <li class="info-item id">{{ character.id }}</li>
          <li class="info-item name">{{ character.name }}</li>
          <li class="info-item">{{ character.gender }}</li>
          <li class="info-item">{{ character.species }}</li>
          <li class="info-item episode">
            {{ character.episode[character.episode.length - 1].episode }}
          </li>
          <li class="info-item favorite">
            <img
              title="Add to favorites"
              role="button"
              id="favorite"
              src="../assets/favorite.svg"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Need to disable TypeScript and ESLint due to relative
// import bug, not sure how to easily fix this without hacks.
// eslint-disable-next-line
// @ts-ignore
import charactersQuery from "../graphql/characters.query.gql";

export default defineComponent({
  name: "Characters",
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  async setup(props) {
    // Get current url search filter after ?="", and
    // clean it up by removing spacebar url encoding
    var searchFilter = window.location.search.substr(2);
    var searchFilterClean = searchFilter.replaceAll("%20", " ");

    const { result } = useQuery(charactersQuery, { page: props.page, filter: searchFilterClean });
    const characters = useResult(result, null, (data) => data.characters.results);

    return { characters };
  },
});
</script>

<style scoped lang="scss">
section {
  h2 {
    margin: 20px 0 0;
    font-size: 26px;
  }

  .char-list {
    display: grid;
    grid-template-columns: 1fr;
    list-style-type: none;
    padding: 0;
    margin: 0;

    .char-item {
      color: black;
      padding: 4px 0px;
      border-radius: 4px;
      border-bottom: 2px solid $gray-100;
      margin: 3px 5px;

      .info-list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        font: 18px "Poppins", sans-serif;
        color: $gray-200;
        list-style-type: none;
        align-items: center;
        text-align: center;
        padding: 0;

        .info-item {
          #photo {
            height: 80px;
            border-radius: 10px;
          }

          #favorite {
            height: 46px;
            padding: 10px;
            border: 2px solid $blue-400;
            border-radius: 8px;
            cursor: pointer;
          }
        }
      }

      @media (max-width: $mobile-breakpoint) {
        margin: 0;
        padding: 12px 0;

        .info-list {
          grid-template-columns: 1fr;

          .info-item.id::before {
            content: "#";
          }

          .info-item.id {
            grid-row: 2 span / 3;
            font-size: 23px;
            margin-left: 12px;
            display: flex;
            width: auto;
          }

          .info-item.name {
            grid-row: 1 span / 4;
            margin: -33px 80px 10px 80px;
            font-size: 21px;
            word-wrap: break-word;
          }

          .info-item.episode::before {
            content: "Last episode: ";
          }

          .info-item.favorite::before {
            content: "Favorite?";
            display: block;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
