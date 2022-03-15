import { Storage } from "@/services/enums";

const getAllFavoriteCharactersFromStorage = (): Array<string> => {
  let properValuesAreSavedInStorage = false;
  const storage = String(localStorage.getItem(Storage.FAVORITE_CHARACTERS));
  const favorites = JSON.parse(storage);

  if (favorites instanceof Array) {
    const areAllElementsStrings = favorites.every((item: unknown) => typeof item === "string");
    if (areAllElementsStrings) properValuesAreSavedInStorage = true;
  }

  return properValuesAreSavedInStorage ? favorites : [];
};

const saveAllFavoriteCharactersToStorage = (favorites: Array<string>): void => {
  localStorage.setItem(Storage.FAVORITE_CHARACTERS, JSON.stringify(favorites));
};

const saveFavoriteCharacterToStorage = (id: string): void => {
  const favorites: Array<string> = getAllFavoriteCharactersFromStorage();
  favorites.push(id);

  // Removing possibility of duplicates in a favorites array
  const favoritesUnique: Array<string> = Array.from(new Set(favorites));
  saveAllFavoriteCharactersToStorage(favoritesUnique);
};

const removeFavoriteCharacterFromStorage = (id: string): void => {
  const favorites: Array<string> = getAllFavoriteCharactersFromStorage();

  const index = favorites.indexOf(id);
  if (index !== -1) favorites.splice(index, 1);

  saveAllFavoriteCharactersToStorage(favorites);
};

const checkForFavoriteCharacterInStorage = (id: string): boolean => {
  const favorites: Array<string> = getAllFavoriteCharactersFromStorage();
  const found = favorites.find((item: string) => item === id);

  return found !== undefined;
};

export {
  getAllFavoriteCharactersFromStorage,
  saveAllFavoriteCharactersToStorage,
  saveFavoriteCharacterToStorage,
  removeFavoriteCharacterFromStorage,
  checkForFavoriteCharacterInStorage,
};
