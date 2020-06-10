import {
  VALIDATE_RSS,
  VALIDATE_RSS_SUCCESS,
  VALIDATE_RSS_FAIL,
  GET_RSS_LIST,
  GET_RSS_LIST_SUCCESS,
  GET_RSS_LIST_FAIL,
} from 'actions/rss';

export const defaultState = {
  list: [],
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
        list: [],
        isValidRss: false,
      };
    case GET_RSS_LIST_FAIL:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.error,
      };
    case GET_RSS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.rssList,
        error: null,
      };
    default:
      return state;
  }
};
