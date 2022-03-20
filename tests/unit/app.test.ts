import { shallowMount } from "@vue/test-utils";
import { mockApolloQueryResultsError } from "./mocks/apollo.mock";
import { generateRandomBoolean } from "./mocks/random.mock";

import { Cookies } from "@/services/enums";
import { getCookieByName } from "@/services/cookies";

import App from "@/app.vue";
import Error from "@/components/error.vue";

// Mock some necessary methods from @vue/apollo-composable npm package
jest.mock("@vue/apollo-composable", () => mockApolloQueryResultsError());

describe("app.vue", (): void => {
  test("application should save cookie when saving character to favorites", (): void => {
    const state: boolean = generateRandomBoolean();
    const instance = shallowMount(App);

    /* Check if cookie is saved on adding character to favorites */ {
      instance.vm.setShowFavorites(state);
      const cookie: string = getCookieByName(Cookies.SHOW_FAVORITES);
      expect(cookie).toBe(String(state));
    }
  });

  test("application should display error view when there are any errors", () => {
    const instance = shallowMount(App);

    /* Check if error view is rendered when there are any errors */ {
      const { element: error } = instance.findComponent(Error);
      expect(error).toBeDefined();
    }
  });
});
