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
      const stringedItems = Array.from(items).map(el => {
        return {
          title: el.querySelector('title').innerHTML,
          link: el.querySelector('link').innerHTML,
          description: el.querySelector('description').textContent,
        };
      });
      const perPage = 3;
      const paginationObject = {
        list: stringedItems,
        paginatedList: stringedItems.slice(0, perPage),
        perPage,
        totalItems: stringedItems.length,
        currentPage: 1,
      };
      dispatch({ type: GET_RSS_LIST_SUCCESS, rssList: paginationObject });
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
  dispatch({ type: VALIDATE_RSS });
  const validationHost = '/validate-rss';
  const validationUrl = `${validationHost}?url=${rssUrl}&output=soap12`;
  fetch(validationUrl)
    .then(response => response.text())
    .then(str => {
      const parsed = /<m:validity>(.*?)<\/m:validity>/g.exec(str);
      // eslint-disable-next-line eqeqeq
      const isValidRss = parsed && parsed.length && parsed[1] == 'true';
      if (isValidRss) {
        return dispatch({ type: VALIDATE_RSS_SUCCESS, isValidRss });
      }
      return dispatch({ type: VALIDATE_RSS_FAIL });
    })
    .catch(() => {
      dispatch({ type: VALIDATE_RSS_FAIL });
    });
};

const calculateArrayPos = (page, perPage) =>
  (page && (page - 1) * perPage) || 0;

const calculateNewPaginatedList = (rssState, newPage) => {
  const originalRssList = rssState.list;
  const newArrayPos = calculateArrayPos(newPage, rssState.perPage);
  const arrayPosLength = rssState.perPage * newPage;

  return originalRssList.slice(newArrayPos, arrayPosLength);
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
