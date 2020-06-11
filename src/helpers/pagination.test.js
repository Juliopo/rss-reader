import { calculateArrayPos } from './pagination';

describe('Pagination', () => {
  it('Should calculate the next array position for the new paginated list', async () => {
    const newPos = calculateArrayPos(3, 4);

    expect(newPos).toEqual(8);
  });

  it('Should calculate the next array position when is in the 1st page', async () => {
    const newPos = calculateArrayPos(1, 3);

    expect(newPos).toEqual(0);
  });
});
