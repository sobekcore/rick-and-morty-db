import { Storage } from "@/services/enums";

const getAllFavoriteCharactersFromStorage = (): Array<string> => {
  const storage = String(localStorage.getItem(Storage.FAVORITE_CHARACTERS));
  const favorites = JSON.parse(storage);

  const areAllElementsStrings = favorites.every((item: unknown) => typeof item === "string");
  return favorites instanceof Array && areAllElementsStrings ? favorites : [];
};

const saveAllFavoriteCharactersToStorage = (favorites: Array<string>): void => {
  localStorage.setItem(Storage.FAVORITE_CHARACTERS, JSON.stringify(favorites));
};

const removeFavoriteCharacterFromStorage = (id: string): void => {
  const favorites: Array<string> = getAllFavoriteCharactersFromStorage();

  const index = favorites.indexOf(id);
  if (index !== -1) favorites.splice(index, 1);

  saveAllFavoriteCharactersToStorage(favorites);
};

const saveFavoriteCharacterToStorage = (id: string): void => {
  const favorites: Array<string> = getAllFavoriteCharactersFromStorage();
  favorites.push(id);

  // Removing possibility of duplicates in a favorites array
  const favoritesUnique: Array<string> = Array.from(new Set(favorites));
  saveAllFavoriteCharactersToStorage(favoritesUnique);
};

export {
  getAllFavoriteCharactersFromStorage,
  saveAllFavoriteCharactersToStorage,
  removeFavoriteCharacterFromStorage,
  saveFavoriteCharacterToStorage,
};
