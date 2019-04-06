import { isSuccessResponse, isFailResponse } from '../helpers';
import { SuccessResponse, FailResponse } from '../types';

const successResponse: SuccessResponse = {
  Response: "True",
  Search: [
    {
      Poster: "some url",
      Title: "some title",
      Type: "movie",
      Year: "some year",
      imdbID: "some id"
    }
  ],
  totalResults: "1"
};

const failResponse: FailResponse = {
  Response: "False",
  Error: "some error"
};

describe('Response type checking helpers', () => {

  it('Should determine success response', () => {
    expect(isSuccessResponse(successResponse)).toBe(true);
    expect(isSuccessResponse(failResponse)).toBe(false);
    expect(isSuccessResponse(null)).toBe(false);
  });

  it('Should determine fail response', () => {
    expect(isFailResponse(failResponse)).toBe(true);
    expect(isFailResponse(successResponse)).toBe(false);
    expect(isFailResponse(null)).toBe(false);
  });

});
