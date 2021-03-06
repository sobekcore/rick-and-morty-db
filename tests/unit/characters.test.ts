import { shallowMount } from "@vue/test-utils";
import { mockApolloQueryResults } from "./mocks/apollo.mock";
import { generateSingleCharacter } from "./mocks/characters.mock";

import { Character } from "@/services/characters";

import {
  checkForFavoriteCharacterInStorage,
  saveFavoriteCharacterToStorage,
} from "@/services/storage";

import Characters from "@/components/characters.vue";

// Mock some necessary methods from @vue/apollo-composable npm package
jest.mock("@vue/apollo-composable", () => mockApolloQueryResults());

describe("characters.vue", (): void => {
  const throwReferenceErrorResponse = (method: string): string => {
    return `Method ${method} is not defined in the component.`;
  };

  test("component should generate list of characters", (): void => {
    const component = shallowMount(Characters, {
      props: {
        favorite: false,
      },
    });

    /* Check for existence of list of characters element */ {
      const { element: list } = component.find(".char-list");
      expect(list).toBeTruthy();
    }
  });

  test("component should save favorite character", (): void => {
    const character: Character = generateSingleCharacter();

    const component = shallowMount(Characters, {
      props: {
        favorite: false,
      },
    });

    if (!component.vm.saveFavorite) {
      throw new ReferenceError(throwReferenceErrorResponse("saveFavorite"));
    }

    /* Check if adding character to favorites work */ {
      component.vm.saveFavorite(character.id);
      const found: boolean = checkForFavoriteCharacterInStorage(character.id);
      expect(found).toBeTruthy();
    }
  });

  test("component should delete favorite character", (): void => {
    const character: Character = generateSingleCharacter();

    const component = shallowMount(Characters, {
      props: {
        favorite: true,
      },
    });

    if (!component.vm.deleteFavorite) {
      throw new ReferenceError(throwReferenceErrorResponse("deleteFavorite"));
    }

    /* Add initial values to storage for later operations */ {
      saveFavoriteCharacterToStorage(character.id);
      const found: boolean = checkForFavoriteCharacterInStorage(character.id);
      expect(found).toBeTruthy();
    }

    /* Check if removing character from favorites work */ {
      component.vm.deleteFavorite(character.id);
      const found: boolean = checkForFavoriteCharacterInStorage(character.id);
      expect(found).toBeFalsy();
    }
  });
});
