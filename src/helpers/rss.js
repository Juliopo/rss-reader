const PER_PAGE = 3;

export const isValidRss = str => {
  const parsed = /<m:validity>(.*?)<\/m:validity>/g.exec(str);
  // eslint-disable-next-line eqeqeq
  return parsed && parsed.length && parsed[1] == 'true';
};

export const getRssItemFromDMParser = items =>
  Array.from(items).map(el => ({
    title: el.querySelector('title').innerHTML,
    link: el.querySelector('link').innerHTML,
    description: el.querySelector('description').textContent,
  }));

export const createInitialPaginatedObject = list => ({
  list,
  paginatedList: list.slice(0, PER_PAGE),
  perPage: PER_PAGE,
  totalItems: list.length,
  currentPage: 1,
});
