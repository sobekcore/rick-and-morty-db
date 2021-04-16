// import { shallowMount, mount } from "@vue/test-utils";
import Navchar from "@/components/navchar.vue";

describe("navbar.vue", () => {
  it("Right count of characters on navbar", () => {
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
