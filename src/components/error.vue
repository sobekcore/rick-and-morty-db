<template>
  <div id="error-wrapper" role="banner">
    <img alt="Rick &#38; Morty Database" id="error-logo" src="@/assets/rick-and-morty.svg" />
    <h2 id="error-desc">{{ message }}</h2>
    <a href="/"><button id="go-back">Go back to safety</button></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error",
  props: {
    message: {
      type: String,
      default: "Something went wrong",
    },
  },
});
</script>

<style scoped lang="scss">
#error-wrapper {
  position: absolute;
  width: 90%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  animation: 1s fadeIn;
  animation-fill-mode: forwards;
  opacity: 0;

  #error-logo {
    height: 120px;
    max-width: 100%;
  }

  #error-desc {
    font: 26px "Poppins", sans-serif;
    margin-bottom: 24px;
    font-weight: 500;
    color: $gray-200;
  }

  #go-back {
    padding: 9px 18px;
    border-radius: 14px;
    border: 2px solid $blue-400;
    font: 19px "Poppins", sans-serif;
    font-weight: 500;
    color: $blue-400;
    background: none;
    outline: none;
    transition: 0.2s box-shadow;
  }

  #go-back:hover {
    cursor: pointer;
    box-shadow: 0 0 16px $blue-400;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
