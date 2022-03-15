import { Ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Characters } from "@/services/enums";

import favoritesQuery from "@/graphql/favorites.query.gql";
import charactersQuery from "@/graphql/characters.query.gql";

// Character types values MUST be placed on new lines and be divided by pipes
/* eslint-disable prettier/prettier */

type status =
  | Characters.STATUS_ALIVE
  | Characters.STATUS_DEAD
  | Characters.TYPE_UNKNOWN;

type gender =
  | Characters.GENDER_MALE
  | Characters.GENDER_FEMALE
  | Characters.GENDER_GENDERLESS
  | Characters.TYPE_UNKNOWN;

/* eslint-enable */

interface Character {
  id: string;
  name: string;
  image: string;
  status: status;
  gender: gender;
  species: string;
  episode: Array<any>;
}

type response = { data: any; loading: Ref<boolean> };

const getAllFavoriteCharacters = (favorites: Array<string>): response => {
  const { result, loading } = useQuery(favoritesQuery, { favorite: favorites });
  const characters = useResult(result, null, (data) => data.charactersByIds);

  return { data: characters, loading: loading };
};

const getAllCharacters = (page: number, search: string): response => {
  const { result, loading } = useQuery(charactersQuery, { page: page, filter: search });
  const characters = useResult(result, null, (data) => data.characters.results);

  return { data: characters, loading: loading };
};

const makeCharacterButtonActiveById = (id: string, boot = false): void => {
  const character = document.querySelector(`[data-id="${id}"]`);

  if (character instanceof HTMLElement) {
    const favorite = character.querySelector(".is-favorite");

    if (favorite instanceof HTMLElement) {
      favorite.setAttribute("title", "Already favorite");
      favorite.classList.add(boot ? "is-active-on-boot" : "is-active");
    }
  }
};

export type { Character, status, gender };
export { getAllFavoriteCharacters, getAllCharacters, makeCharacterButtonActiveById };
