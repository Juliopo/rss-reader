import {
  isValidRss,
  getRssItemFromDMParser,
  createInitialPaginatedObject,
} from 'helpers/rss';
import { calculateNewPaginatedList } from 'helpers/pagination';

export const VALIDATE_RSS = 'VALIDATE_RSS';
export const VALIDATE_RSS_SUCCESS = 'VALIDATE_RSS_SUCCESS';
export const VALIDATE_RSS_FAIL = 'VALIDATE_RSS_FAIL';
export const GET_RSS_LIST = 'GET_RSS_LIST';
export const GET_RSS_LIST_SUCCESS = 'GET_RSS_LIST_SUCCESS';
export const GET_RSS_LIST_FAIL = 'GET_RSS_LIST_FAIL';
export const PAGINATE_RSS_LIST = 'PAGINATE_RSS_LIST';

export const getRSSFromUrl = rssUrl => dispatch => {
  dispatch({ type: GET_RSS_LIST });
  fetch(rssUrl)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
      const items = data.querySelectorAll('item');
      const list = getRssItemFromDMParser(items);
      const initialPaginatedObject = createInitialPaginatedObject(list);

      dispatch({ type: GET_RSS_LIST_SUCCESS, rssList: initialPaginatedObject });
    })
    .catch(err => {
      let error;
      if (err.toString().includes('fetch')) {
        error =
          'The url is not possible to fetch (probably due to CORS policy)';
      }

      dispatch({ type: GET_RSS_LIST_FAIL, error });
    });
};

export const validateRSS = rssUrl => dispatch => {
  const validationHost = '/validate-rss';
  const validationUrl = `${validationHost}?url=${rssUrl}&output=soap12`;

  dispatch({ type: VALIDATE_RSS });

  return fetch(validationUrl)
    .then(response => response.text())
    .then(str => {
      if (isValidRss(str)) {
        return dispatch({ type: VALIDATE_RSS_SUCCESS, isValidRss: true });
      }

      return dispatch({ type: VALIDATE_RSS_FAIL });
    })
    .catch(() => {
      dispatch({ type: VALIDATE_RSS_FAIL });
    });
};

export const paginateRssList = page => (dispatch, getState) => {
  const rssState = getState().rss.rss;
  const paginatedList = calculateNewPaginatedList(rssState, page);

  return dispatch({
    type: PAGINATE_RSS_LIST,
    page,
    paginatedList,
  });
};
