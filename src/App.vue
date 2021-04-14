<template>
  <h1>Rick <span>&#38;</span> Morty Database</h1>
  <div v-for="index in 34" :key="index">
    <Characters v-bind:page="index" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Characters from "./components/characters.vue";

export default defineComponent({
  name: "App",
  components: {
    Characters,
  },
});
</script>

<style lang="scss">
#app {
  font-family: sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
