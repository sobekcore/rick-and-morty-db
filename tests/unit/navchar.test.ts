import { shallowMount } from "@vue/test-utils";
import { generateRandomBoolean } from "./mocks/random.mock";

import Navchar from "@/components/navchar.vue";

describe("navchar.vue", (): void => {
  const REMOVE_FROM_FAVORITES: string = "Remove from Favorites";
  const ADD_TO_FAVORITES: string = "Add to Favorites";

  test("component should generate label depending on its state", (): void => {
    const favorite: boolean = generateRandomBoolean();
    const label: string = favorite ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES;

    const component = shallowMount(Navchar, {
      props: {
        favorite: favorite,
      },
    });

    /* Check if component generates proper label */ {
      const { element: header } = component.find(".favorites");
      expect(header.textContent).toBe(label);
    }
  });
});
