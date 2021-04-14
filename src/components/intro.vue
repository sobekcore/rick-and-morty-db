<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <button @click="clickMethod">Test method response</button>
    <ul>
      <li v-for="character in characters" :key="character.id">
        {{ character.name }}
      </li>
    </ul>
  </div>
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
  name: "Intro",
  props: {
    msg: String,
  },
  methods: {
    clickMethod() {
      //console.log(this.characters);
    },
  },
  // data() {
  //   return {
  //     characters: [],
  //   };
  // },
  setup() {
    const { result } = useQuery(charactersQuery, { page: 1 });
    const characters = useResult(result, null, (data) => data.characters.results);
    return { characters };
  },
});
</script>

<style scoped lang="scss">
h2 {
  margin: 20px 0 0;
  font-size: 26px;
}

button {
  padding: 4px 10px;
  margin: 40px 0;
  background: darksalmon;
  border: 2px solid black;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style-type: none;
  margin: 10px 40px;
  padding: 0;

  li {
    background: darksalmon;
    color: black;
    padding: 3px 5px;
    border-radius: 4px;
    margin: 3px 5px;
  }
}
</style>
