import { Search } from "@/services/enums";

const getSearchedValueFromUrl = (): string => {
  // Get current url search filter, and clean it up by removing space bar url encoding
  const searchFilter: string = window.location.search.replace(Search.QUERY_SUFFIX_FULL, "");
  return searchFilter.replaceAll("%20", " ");
};

export { getSearchedValueFromUrl };
