import { shallowMount } from "@vue/test-utils";

import Error from "@/components/error.vue";

describe("error.vue", () => {
  test("component should display props message", () => {
    const message = "404: Not Found";

    const component = shallowMount(Error, {
      props: {
        message: message,
      },
    });

    /* Check if element textContent is matching actual error message */ {
      const { element: description } = component.find("#error-desc");
      expect(description.textContent).toBe(message);
    }
  });
});
