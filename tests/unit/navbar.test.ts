import { shallowMount } from "@vue/test-utils";
import { generateRandomBoolean } from "./mocks/random.mock";

import Navbar from "@/components/navbar.vue";

describe("navbar.vue", (): void => {
  test("component should emit showFavorites value", (): void => {
    const component = shallowMount(Navbar, {
      props: {
        showFavorites: generateRandomBoolean(),
      },
    });

    /* Check if clicking on button emits showFavorites value */ {
      const { element: item } = component.find(".navbar-item");
      const clickEvent: Event = new Event("click");
      item.dispatchEvent(clickEvent);

      const emitted = component.emitted();
      const [emittedValue] = emitted["showFavorites"];

      expect(emittedValue).toBeTruthy();
    }
  });

  test("component should make one of the buttons active", (): void => {
    const component = shallowMount(Navbar, {
      props: {
        showFavorites: generateRandomBoolean(),
      },
    });

    /* Check if any active button exists */ {
      const { element: button } = component.find(".is-active");
      expect(button).toBeDefined();
    }
  });
});
