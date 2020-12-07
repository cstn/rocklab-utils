/**
 * @fileoverview unit tests for the redux list selectors factory
 */

import createSelectors from './listSelectorsFactory';

const mockList = [1, 2, 3];
const mockStatus = 'pending';
const mockError = 'error';
const mockState = {
  test: {
    a: {
      list: mockList,
      status: mockStatus,
      error: mockError,
      total: 99,
      count: 3,
      limit: 100,
      offset: 0,
    },
  },
};

describe('listSelectorsFactory', () => {
  const {
    selectList,
    selectListSize,
    selectError,
    selectStatus,
    selectLimit,
    selectOffset,
    selectCount,
    selectTotal,
  } = createSelectors('test/a');

  it('should select the list', () => {
    const selected = selectList(mockState);

    expect(selected).toEqual(mockList);
  });

  it('should select the limit', () => {
    const selected = selectLimit(mockState);

    expect(selected).toEqual(100);
  });

  it('should select the offset', () => {
    const selected = selectOffset(mockState);

    expect(selected).toEqual(0);
  });

  it('should select the total count', () => {
    const selected = selectTotal(mockState);

    expect(selected).toEqual(99);
  });

  it('should select the item count', () => {
    const selected = selectCount(mockState);

    expect(selected).toEqual(3);
  });

  it('should select the list size', () => {
    const selected = selectListSize(mockState);

    expect(selected).toEqual(mockList.length);
  });

  it('should select the pending state', () => {
    const selected = selectStatus(mockState);

    expect(selected).toEqual(mockStatus);
  });

  it('should select the error', () => {
    const selected = selectError(mockState);

    expect(selected).toEqual(mockError);
  });
});
