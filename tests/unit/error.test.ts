import { shallowMount } from "@vue/test-utils";
import { mock404ServerResponse } from "./mocks/response.mock";

import Error from "@/components/error.vue";

describe("error.vue", (): void => {
  test("component should display props message", (): void => {
    const message: string = mock404ServerResponse();

    const component = shallowMount(Error, {
      props: {
        message: message,
      },
    });

    /* Check if element textContent is matching actual error message */ {
      const { element: description } = component.find(".error-desc");
      expect(description.textContent).toBe(message);
    }
  });
});
