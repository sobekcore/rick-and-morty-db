<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Intro",
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
h2 {
  margin: 20px 0 0;
  font-size: 26px;
}
</style>
