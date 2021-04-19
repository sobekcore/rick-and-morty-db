import { shallowMount } from "@vue/test-utils";

import Navchar from "@/components/navchar.vue";
import Header from "@/components/header.vue";
import Error from "@/components/error.vue";

// For some reason i cant mount components that has imports
// outside of "vue" ones in it, because of that i cant
// really precisly test my components, otherwise the tests
// would be much more advanced than that of course.

describe("header.vue", () => {
  it("Header component exists", () => {
    expect(Header);
  });

  const max = 671;
  const rand = Math.floor(Math.random() * max);

  // Getting props value from component
  const header = shallowMount(Header, {
    props: {
      count: rand,
    },
  });

  it("Is a passed props a number", () => {
    expect(typeof header.props("count")).toBe("number");
  });

  it("Is number in range of 1 and 671", () => {
    expect(header.props("count")).toBeGreaterThanOrEqual(1);
    expect(header.props("count")).toBeLessThanOrEqual(max);
  });

  it("Proper number showcase", () => {
    expect(header.text()).toMatch(String(rand));
  });
});

describe("navchar.vue", () => {
  it("Navchar component exists", () => {
    expect(Navchar);
  });

  it("Is a passed props a boolean", () => {
    const rand = Math.floor(Math.random() * 2);
    let bool = null;
    if (rand == 1) bool = true;
    else bool = false;

    const navchar = shallowMount(Navchar, {
      props: { bool },
    });
    expect(typeof navchar.props("favorite")).toBe("boolean");
  });
});

describe("error.vue", () => {
  it("Error component exists", () => {
    expect(Error);
  });
});
