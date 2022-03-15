import { Characters } from "@/services/enums";
import { Character } from "@/services/characters";

const generateSingleCharacter = (): Character => {
  return {
    id: "1",
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: Characters.STATUS_ALIVE,
    gender: Characters.GENDER_MALE,
    species: "Human",
    episode: [
      { episode: "S01E01" },
      // ...
      { episode: "S05E10" },
    ],
  };
};

const generateArrayOfCharacters = (): Array<Character> => {
  return [
    {
      id: "1",
      name: "Rick Sanchez",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      status: Characters.STATUS_ALIVE,
      gender: Characters.GENDER_MALE,
      species: "Human",
      episode: [
        { episode: "S01E01" },
        // ...
        { episode: "S05E10" },
      ],
    },
    {
      id: "2",
      name: "Morty Smith",
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      status: Characters.STATUS_ALIVE,
      gender: Characters.GENDER_MALE,
      species: "Human",
      episode: [
        { episode: "S01E01" },
        // ...
        { episode: "S05E10" },
      ],
    },
  ];
};

export { generateSingleCharacter, generateArrayOfCharacters };
