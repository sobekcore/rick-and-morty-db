<template>
  <h1>Hello World!</h1>
  <Intro msg="Welcome from an introduction component." />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "./components/intro.vue";

export default defineComponent({
  name: "App",
  components: {
    Intro,
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
