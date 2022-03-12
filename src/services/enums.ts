enum Search {
  QUERY_SUFFIX = "q=",
  QUERY_SUFFIX_FULL = "?q=",
}

enum LocalStorage {
  FAVORITE_CHARACTERS = "rnmdb-favorite-characters",
}

enum Cookies {
  SHOW_FAVORITES = "showFavorites",
}

enum Character {
  STATUS_ALIVE = "Alive",

  GENDER_MALE = "Male",
  GENDER_FEMALE = "Female",
  GENDER_GENDERLESS = "Genderless",
}

export { Search, LocalStorage, Cookies, Character };
