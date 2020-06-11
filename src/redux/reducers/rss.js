import {
  VALIDATE_RSS,
  VALIDATE_RSS_SUCCESS,
  VALIDATE_RSS_FAIL,
  GET_RSS_LIST,
  GET_RSS_LIST_SUCCESS,
  GET_RSS_LIST_FAIL,
  PAGINATE_RSS_LIST,
} from 'actions/rss';

export const defaultState = {
  rss: {
    list: [],
    paginatedList: [],
    perPage: 0,
    totalItems: 0,
    currentPage: 0,
  },
  error: null,
  isValidRss: false,
  isLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_RSS_LIST:
    case VALIDATE_RSS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case VALIDATE_RSS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isValidRss: action.isValidRss,
        error: null,
      };
    case VALIDATE_RSS_FAIL:
      return {
        ...state,
        isLoading: false,
        rss: defaultState.rss,
        isValidRss: false,
      };
    case GET_RSS_LIST_FAIL:
      return {
        ...state,
        rss: defaultState.rss,
        isLoading: false,
        error: action.error,
      };
    case GET_RSS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rss: action.rssList,
        error: null,
      };
    case PAGINATE_RSS_LIST:
      return {
        ...state,
        rss: {
          currentPage: action.page,
          list: state.rss.list,
          paginatedList: action.paginatedList,
          perPage: state.rss.perPage,
          totalItems: state.rss.totalItems,
        },
      };
    default:
      return state;
  }
};
