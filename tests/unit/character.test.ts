import { shallowMount } from "@vue/test-utils";
import { generateSingleCharacter } from "./mocks/characters.mock";
import { mockApolloQueryResults } from "./mocks/apollo.mock";

import { Character } from "@/services/characters";
import { saveFavoriteCharacterToStorage } from "@/services/storage";

import CharacterComponent from "@/components/character.vue";

// Mock some necessary methods from @vue/apollo-composable npm package
jest.mock("@vue/apollo-composable", () => mockApolloQueryResults());

describe("character.vue", () => {
  test("component should propagate DOM with passed character data", () => {
    const character: Character = generateSingleCharacter();

    const component = shallowMount(CharacterComponent, {
      props: {
        favorite: false,
        character: character,
      },
    });

    /* Check for propagated Character ID */ {
      const { element: id } = component.find(".info-item.id");
      expect(id.textContent).toBe(character.id);
    }

    /* Check for propagated Character name */ {
      const { element: name } = component.find(".info-item.name");
      expect(name.textContent).toBe(character.name);
    }

    /* Check for propagated Character image */ {
      const { element: image } = component.find(".info-item .photo");
      const src = image.getAttribute("src");
      expect(src).toBe(character.image);
    }

    /* Check for propagated Character gender */ {
      const { element: gender } = component.find(".info-item.gender");
      expect(gender.textContent).toBe(character.gender);
    }

    /* Check for propagated Character species */ {
      const { element: species } = component.find(".info-item.species");
      expect(species.textContent).toBe(character.species);
    }

    /* Check for propagated Character episode */ {
      const { element: episode } = component.find(".info-item.episode");
      const lastEpisode = character.episode[character.episode.length - 1];
      expect(episode.textContent).toBe(lastEpisode.episode);
    }
  });

  test("component should emit saveFavorite value", () => {
    const character: Character = generateSingleCharacter();

    const component = shallowMount(CharacterComponent, {
      props: {
        favorite: false,
        character: character,
      },
    });

    /* Check for initially empty emitted values */ {
      const emitted = component.emitted();
      expect(Object.keys(emitted).length).toBe(0);
    }

    /* Check for emitted value to exist and be truthy */ {
      const { element: button } = component.find(".is-favorite");
      const clickEvent = new Event("click");
      button.dispatchEvent(clickEvent);

      const emitted = component.emitted();
      const [emittedValue] = emitted["saveFavorite"];

      expect(emittedValue).toBeTruthy();
    }
  });

  test("component should emit deleteFavorite value", () => {
    const character: Character = generateSingleCharacter();

    const component = shallowMount(CharacterComponent, {
      props: {
        favorite: true,
        character: character,
      },
    });

    /* Check for initially empty emitted values */ {
      const emitted = component.emitted();
      expect(Object.keys(emitted).length).toBe(0);
    }

    /* Check for emitted value to exist and be truthy */ {
      const { element: button } = component.find(".already-favorite");

      const clickEvent = new Event("click");
      button.dispatchEvent(clickEvent);

      const emitted = component.emitted();
      const [emittedValue] = emitted["deleteFavorite"];

      expect(emittedValue).toBeTruthy();
    }
  });

  test("component should activate button on favorite character", () => {
    const character: Character = generateSingleCharacter();

    saveFavoriteCharacterToStorage(character.id);

    const component = shallowMount(CharacterComponent, {
      attachTo: document.body,
      props: {
        favorite: false,
        character: character,
      },
    });

    /* Check if favorite button is activated on favorite character */ {
      const { element: favorite } = component.find(".is-favorite");
      const isActiveOnBoot = favorite.classList.contains("is-active-on-boot");
      expect(isActiveOnBoot).toBeTruthy();
    }
  });
});
