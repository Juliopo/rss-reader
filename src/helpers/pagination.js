export const calculateArrayPos = (page, perPage) =>
  (page && (page - 1) * perPage) || 0;

export const calculateNewPaginatedList = (rssState, newPage) => {
  const originalRssList = rssState.list;
  const newArrayPos = calculateArrayPos(newPage, rssState.perPage);
  const arrayPosLength = rssState.perPage * newPage;

  return originalRssList.slice(newArrayPos, arrayPosLength);
};
