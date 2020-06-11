/* eslint-disable import/named */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  validationTrueResponse,
  validationFalseResponse,
  validationErrorResponse,
} from '../../../__mocks__/rssValidation';
import { rssFeed } from '../../../__mocks__/rssFeed';

import {
  VALIDATE_RSS,
  VALIDATE_RSS_SUCCESS,
  VALIDATE_RSS_FAIL,
  GET_RSS_LIST,
  validateRSS,
  getRSSFromUrl,
} from './rss';

require('isomorphic-fetch');

export const mockStore = configureMockStore([thunk]);

describe('Redux Rss actions', () => {
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

  it('Should should the the RSS feed when the url is valid', async () => {
    const url = 'https://codepen.io/picks/feed/';

    fetchMock.mock(url, {
      body: rssFeed,
    });

    const store = mockStore();
    await store.dispatch(getRSSFromUrl(url));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: GET_RSS_LIST });
  });
});
