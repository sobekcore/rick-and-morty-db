<template>
  <article v-if="information !== null">
    <Navbar :count="information.count" />
    <!-- Navchar is a 2nd navbar + character info keys -->
    <Navchar />
    <div v-for="index in information.pages" :key="index">
      <Suspense>
        <template #default>
          <Characters :page="index" />
        </template>
      </Suspense>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";

// Import Components
import Characters from "./components/characters.vue";
import Navbar from "./components/navbar.vue";
import Navchar from "./components/navchar.vue";

// eslint-disable-next-line
// @ts-ignore
import informationQuery from "./graphql/information.query.gql";

export default defineComponent({
  name: "App",
  components: {
    Characters,
    Navbar,
    Navchar,
  },
  setup() {
    var loaded = false;
    setTimeout(() => (loaded = true), 2000);
    const { result } = useQuery(informationQuery);
    const information = useResult(result, null, (data) => data.characters.info);

    return { loaded, information };
  },
});
</script>

<style scope lang="scss"></style>
