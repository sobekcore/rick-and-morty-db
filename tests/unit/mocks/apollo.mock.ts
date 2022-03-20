import { generateArrayOfCharacters } from "./characters.mock";
import { mock404ServerResponse } from "./response.mock";

const mockApolloQueryResults = (): any => {
  return {
    useQuery: jest.fn(() => {
      return {
        loading: false,
        result: generateArrayOfCharacters(),
      };
    }),
    useResult: jest.fn((result) => {
      return result;
    }),
  };
};

const mockApolloQueryResultsError = (): any => {
  return {
    useQuery: jest.fn(() => {
      return {
        loading: false,
        error: { message: mock404ServerResponse() },
      };
    }),
    useResult: jest.fn((result) => {
      return result;
    }),
  };
};

export { mockApolloQueryResults, mockApolloQueryResultsError };
