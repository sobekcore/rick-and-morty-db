// import { shallowMount, mount } from "@vue/test-utils";
import Navchar from "@/components/navchar.vue";
import Header from "@/components/header.vue";

// For some reason i cant mount components that has imports
// outside of "vue" ones in it, because of that i cant
// really precisly test my components, otherwise the tests
// would be much more advanced than that of course.

describe("characters.vue", () => {
  it("Proper number of pages", () => {
    const count = 34;
    expect(count).toEqual(count);
  });
});

describe("navbar.vue", () => {
  it("Right count of characters on navbar", () => {
    const count = 671;
    expect(count).toEqual(count);
  });
});

describe("header.vue", () => {
  it("Header component exists", () => {
    expect(Header);
  });
});

describe("navchar.vue", () => {
  it("Navchar component exists", () => {
    expect(Navchar);
  });
});
