<template>
  <div class="error-wrapper" role="banner">
    <img class="error-logo" src="@/assets/rick-and-morty.svg" alt="Rick &#38; Morty Database" />
    <h2 class="error-desc">{{ message }}</h2>
    <a href="/"><button class="go-back">Go back to safety</button></a>
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
.error-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  opacity: 0;
  text-align: center;
  transform: translate(-50%, -50%);
  animation: 1s fadeIn;
  animation-fill-mode: forwards;

  .error-logo {
    height: 120px;
    max-width: 100%;
  }

  .error-desc {
    font: 21px "Poppins", sans-serif;
    margin-bottom: 24px;
    font-weight: 500;
    color: $white-300;
  }

  .go-back {
    padding: 9px 18px;
    border-radius: 14px;
    border: 2px solid $brand-color;
    font: 18px "Poppins", sans-serif;
    font-weight: 500;
    color: $brand-color;
    background: $white-50;
    outline: none;
    transition: 0.2s box-shadow;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 12px $brand-color;
    }
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
