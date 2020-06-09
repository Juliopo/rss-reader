export const defaultState = {
  list: [],
  isValidRss: false,
  isLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
