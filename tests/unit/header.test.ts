import { shallowMount } from "@vue/test-utils";
import { generateArrayOfCharacters } from "./mocks/characters.mock";
import { makeWindowLocationAccessible } from "./mocks/url.mock";

import { Search } from "@/services/enums";
import { Character } from "@/services/characters";

import Header from "@/components/header.vue";

describe("header.vue", (): void => {
  test("component should show passed counter of characters", (): void => {
    const characters: Array<Character> = generateArrayOfCharacters();

    const component = shallowMount(Header, {
      props: {
        count: characters.length,
      },
    });

    /* Check if passed count prop is appended to element */ {
      const { element: count } = component.find(".count");
      expect(count.textContent).toBe(String(characters.length));
    }
  });

  test("component should replace search value with url query", (): void => {
    // Make window.location accessible in the whole test
    makeWindowLocationAccessible();

    const characters: Array<Character> = generateArrayOfCharacters();
    const [character] = characters;

    window.location.search = Search.QUERY_SUFFIX_FULL + character.name;

    const component = shallowMount(Header, {
      props: {
        count: characters.length,
      },
    });

    /* Check if current URL query is embedded into search bar */ {
      const { element: url } = component.find(".url");
      expect(url.value).toBe(character.name);
    }

    // Change back query params to initial state
    window.location.search = Search.QUERY_SUFFIX_FULL;
  });

  test("component should change url when searching characters", (): void => {
    // Make window.location accessible in the whole test
    makeWindowLocationAccessible();

    const characters: Array<Character> = generateArrayOfCharacters();
    const [character] = characters;

    window.location.search = Search.QUERY_SUFFIX_FULL;

    const component = shallowMount(Header, {
      props: {
        count: characters.length,
      },
    });

    /* Check if window.location.search changes when searching */ {
      const { element: url } = component.find(".url");
      url.setAttribute("value", character.name);

      const { element: search } = component.find(".search");
      const clickEvent = new Event("click");
      search.dispatchEvent(clickEvent);

      expect(window.location.search).toBe(Search.QUERY_SUFFIX_FULL + character.name);
    }

    // Change back query params to initial state
    window.location.search = Search.QUERY_SUFFIX_FULL;
  });
});
