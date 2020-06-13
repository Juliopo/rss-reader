import { listMock } from 'mocks/rssState';
import { calculateArrayPos, calculateNewPaginatedList } from './pagination';

describe('Pagination', () => {
  it('Should calculate the next array position for the new paginated list', () => {
    const newPos = calculateArrayPos(3, 4);

    expect(newPos).toEqual(8);
  });

  it('Should calculate the next array position when is in the 1st page', () => {
    const newPos = calculateArrayPos(1, 3);

    expect(newPos).toEqual(0);
  });

  it('calculateNewPaginatedList function', () => {
    const rssState = {
      list: listMock,
      paginatedList: listMock.slice(2, 4),
      perPage: 2,
      totalItems: 5,
      currentPage: 2,
    };

    const newPaginatedList1 = calculateNewPaginatedList(rssState, 3);
    const newPaginatedList2 = calculateNewPaginatedList(rssState, 1);
    const newPaginatedList3 = calculateNewPaginatedList(rssState, 2);

    expect(newPaginatedList1).toEqual(rssState.list.slice(4, 6));
    expect(newPaginatedList2).toEqual(rssState.list.slice(0, 2));
    expect(newPaginatedList3).toEqual(rssState.paginatedList);
  });
});
