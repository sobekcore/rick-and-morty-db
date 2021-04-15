<template>
  <div>Loading...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
});
</script>

<style scoped lang="scss">
div {
  background: chartreuse;
  z-index: 99;
  width: 100vw;
  height: 100vh;
}
</style>
