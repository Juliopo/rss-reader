import rssResponse from 'mocks/rssResponse';
import { listMock } from 'mocks/rssState';

import {
  VALIDATE_RSS,
  VALIDATE_RSS_SUCCESS,
  VALIDATE_RSS_FAIL,
  PAGINATE_RSS_LIST,
  GET_RSS_LIST,
  GET_RSS_LIST_SUCCESS,
} from '../actions/rss';
import rss, { defaultState } from './rss';

describe('Redux Rss reducer', () => {
  const initCases = {
    ...defaultState,
    isLoading: true,
    error: null,
  };

  const rssList = {
    list: listMock,
    paginatedList: rssResponse.slice(0, 3),
    perPage: 2,
    totalItems: 5,
    currentPage: 1,
  };

  it('Should go to the default state', () => {
    expect(rss(undefined, {})).toEqual(defaultState);
  });

  it('Should handle VALIDATE_RSS case', () => {
    expect(rss(defaultState, { type: VALIDATE_RSS })).toEqual(initCases);
  });

  it('Should handle GET_RSS_LIST case', () => {
    expect(rss(defaultState, { type: GET_RSS_LIST })).toEqual(initCases);
  });

  it('Should handle VALIDATE_RSS_SUCCESS case', () => {
    expect(
      rss(defaultState, { type: VALIDATE_RSS_SUCCESS, isValidRss: true })
    ).toEqual({
      ...defaultState,
      isValidRss: true,
      error: null,
      isLoading: false,
    });
  });

  it('Should handle VALIDATE_RSS_FAIL case', () => {
    expect(
      rss(defaultState, { type: VALIDATE_RSS_FAIL, isValidRss: false })
    ).toEqual({
      ...defaultState,
      isValidRss: false,
      error: null,
      isLoading: false,
    });
  });

  it('Should handle GET_RSS_LIST_SUCCESS case', () => {
    const rssAction = {
      type: GET_RSS_LIST_SUCCESS,
      rssList: {
        list: listMock,
        paginatedList: rssResponse.slice(0, 3),
        perPage: 0,
        totalItems: 0,
        currentPage: 0,
      },
    };
    expect(rss(defaultState, rssAction)).toEqual({
      ...defaultState,
      rss: {
        list: listMock,
        paginatedList: rssResponse.slice(0, 3),
        perPage: 0,
        totalItems: 0,
        currentPage: 0,
      },
      error: null,
      isLoading: false,
    });
  });

  it('Should handle PAGINATE_RSS_LIST', () => {
    expect(
      rss(
        {
          ...defaultState,
          rss: rssList,
        },
        {
          type: PAGINATE_RSS_LIST,
          page: 2,
          paginatedList: listMock.slice(2, 4),
        }
      )
    ).toEqual({
      ...defaultState,
      rss: {
        list: listMock,
        paginatedList: listMock.slice(2, 4),
        perPage: 2,
        totalItems: 5,
        currentPage: 2,
      },
      error: null,
      isLoading: false,
    });
  });
});
