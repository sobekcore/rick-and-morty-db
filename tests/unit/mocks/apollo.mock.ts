import { generateArrayOfCharacters } from "./characters.mock";

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

export { mockApolloQueryResults };
