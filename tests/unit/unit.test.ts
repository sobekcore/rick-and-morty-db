import { shallowMount } from "@vue/test-utils";

import Header from "@/components/header.vue";
import Navchar from "@/components/navchar.vue";
import Character from "@/components/character.vue";
import Error from "@/components/error.vue";

describe("header.vue", () => {
  test("Header component exists", () => {
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

  test("Is a passed props a number", () => {
    expect(typeof header.props("count")).toBe("number");
  });

  test("Is number in range of 1 and 671", () => {
    expect(header.props("count")).toBeGreaterThanOrEqual(1);
    expect(header.props("count")).toBeLessThanOrEqual(max);
  });

  test("Proper number showcase", () => {
    expect(header.text()).toMatch(String(rand));
  });
});

describe("navchar.vue", () => {
  test("Navchar component exists", () => {
    expect(Navchar);
  });

  test("Is a passed props a boolean", () => {
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

describe("character.vue", () => {
  test("Character component exists", () => {
    expect(Character);
  });
});

describe("error.vue", () => {
  test("Error component exists", () => {
    expect(Error);
  });
});
