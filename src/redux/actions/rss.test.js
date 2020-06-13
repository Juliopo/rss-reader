/* eslint-disable import/named */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import rssResponse from 'mocks/rssResponse';

import {
  validationTrueResponse,
  validationFalseResponse,
  validationErrorResponse,
} from 'mocks/rssValidation';
import { listMock } from 'mocks/rssState';
import { defaultState } from '../reducers/rss';

import {
  VALIDATE_RSS,
  VALIDATE_RSS_SUCCESS,
  VALIDATE_RSS_FAIL,
  GET_RSS_LIST,
  PAGINATE_RSS_LIST,
  GET_RSS_LIST_SUCCESS,
  validateRSS,
  getRSSFromUrl,
  paginateRssList,
} from './rss';

require('isomorphic-fetch');

export const mockStore = configureMockStore([thunk]);

describe('Redux Rss actions', () => {
  const rssList = {
    list: listMock,
    paginatedList: listMock.slice(0, 3),
    perPage: 3,
    totalItems: 4,
    currentPage: 1,
  };

  afterEach(() => {
    fetchMock.restore();
  });

  it('Should validate the correct URL', async () => {
    const url = '/https://codepen.io/picks/feed/';
    const validationHost = '/validate-rss';
    const validationUrl = `${validationHost}?url=${url}&output=soap12`;

    fetchMock.mock(validationUrl, {
      body: validationTrueResponse,
      headers: { 'content-type': 'application/soap+xml; charset=UTF-8' },
    });

    const store = mockStore();
    await store.dispatch(validateRSS(url));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: VALIDATE_RSS });
    expect(actions[1]).toEqual({
      type: VALIDATE_RSS_SUCCESS,
      isValidRss: true,
    });
  });

  it('Should validate the wrong url', async () => {
    const url = 'https://web.whatsapp.com/';
    const validationHost = '/validate-rss';
    const validationUrl = `${validationHost}?url=${url}&output=soap12`;

    fetchMock.mock(validationUrl, {
      body: validationFalseResponse,
      headers: { 'content-type': 'application/soap+xml; charset=UTF-8' },
    });

    const store = mockStore();
    await store.dispatch(validateRSS(url));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: VALIDATE_RSS });
    expect(actions[1]).toEqual({
      type: VALIDATE_RSS_FAIL,
    });
  });

  it('Should show it wrong even if is not an url', async () => {
    const url = '12345';
    const validationHost = '/validate-rss';
    const validationUrl = `${validationHost}?url=${url}&output=soap12`;

    fetchMock.getOnce(validationUrl, {
      body: validationErrorResponse,
      headers: { 'content-type': 'text/xml; charset=UTF-8' },
    });

    const store = mockStore();
    await store.dispatch(validateRSS(url));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: VALIDATE_RSS });
    expect(actions[1]).toEqual({
      type: VALIDATE_RSS_FAIL,
    });
  });

  it('Should read the RSS feed when the url is valid', async () => {
    const url =
      'https://www.omnycontent.com/d/playlist/4b5f9d6d-9214-48cb-8455-a73200038129/a7c446d6-29da-43ba-bbe5-a7da00ecda4a/a65603a6-cf22-4150-91c1-a7da00ed5220/podcast.rss';

    fetchMock.mock(url, {
      body: rssResponse,
    });

    const store = mockStore();
    await store.dispatch(getRSSFromUrl(url));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: GET_RSS_LIST });
    expect(actions[1]).toEqual({
      type: GET_RSS_LIST_SUCCESS,
      rssList,
    });
  });

  it('Should paginate', async () => {
    const store = mockStore({
      rss: {
        ...defaultState,
        rss: rssList,
      },
    });
    const newPage = 2;
    await store.dispatch(paginateRssList(newPage));
    expect(store.getActions()[0]).toEqual({
      type: PAGINATE_RSS_LIST,
      page: newPage,
      paginatedList: rssList.list.slice(3, 6),
    });
  });
});
