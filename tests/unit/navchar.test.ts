import { shallowMount } from "@vue/test-utils";
import { generateRandomBoolean } from "./mocks/random.mock";

import Navchar from "@/components/navchar.vue";

describe("navchar.vue", () => {
  test("component should generate label depending on its state", () => {
    const favorite = generateRandomBoolean();
    const label = favorite ? "Remove from Favorites" : "Add to Favorites";

    const component = shallowMount(Navchar, {
      props: {
        favorite: favorite,
      },
    });

    const { element: header } = component.find(".favorites");
    expect(header.textContent).toBe(label);
  });
});
