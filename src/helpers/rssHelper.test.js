import {
  validationTrueResponse,
  validationErrorResponse,
} from 'mocks/rssValidation';
import { listMock } from 'mocks/rssState';
import { isValidRss, createInitialPaginatedObject } from './rss';

describe('Rss helpers', () => {
  it('Should test isValidRss function', () => {
    const isValid = isValidRss(validationTrueResponse);

    expect(isValid).toBe(true);
  });

  it('Should test isValidRss falsy function', () => {
    const isValid = isValidRss(validationErrorResponse);

    expect(Boolean(isValid)).toBe(false);
  });

  it('Should test createInitialPaginatedObject function', () => {
    const initState = createInitialPaginatedObject(listMock);

    expect(initState).toEqual({
      list: listMock,
      paginatedList: listMock.slice(0, 3),
      perPage: 3,
      totalItems: listMock.length,
      currentPage: 1,
    });
  });
});
