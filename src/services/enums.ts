enum Search {
  QUERY_SUFFIX_FULL = "?q=",
}

enum Storage {
  FAVORITE_CHARACTERS = "rnmdb-favorite-characters",
}

enum Cookies {
  SHOW_FAVORITES = "showFavorites",
}

enum Characters {
  STATUS_ALIVE = "Alive",
  STATUS_DEAD = "Dead",

  GENDER_MALE = "Male",
  GENDER_FEMALE = "Female",
  GENDER_GENDERLESS = "Genderless",

  TYPE_UNKNOWN = "unknown",
}

enum Time {
  UNIT_SECOND = "second",
  UNIT_MINUTE = "minute",
  UNIT_HOUR = "hour",
  UNIT_DAY = "day",
  UNIT_WEEK = "week",
}

export { Search, Storage, Cookies, Characters, Time };
