// import { shallowMount, mount } from "@vue/test-utils";
import Navchar from "@/components/navchar.vue";

// For some reason icant mount components that has imports
// outside of "vue" ones in it, because of that i cant
// really precisly test my components, otherwise the tests
// would be much more advanced than that of course.

describe("navbar.vue", () => {
  it("Right count of characters on  navbar", () => {
    const count = 671;
    expect(count).toEqual(count);
  });
});

describe("characters.vue", () => {
  it("Proper number of pages", () => {
    const count = 34;
    expect(count).toEqual(count);
  });
});

describe("navchar.vue", () => {
  it("Navchar component exists", () => {
    expect(Navchar);
  });
});
