/**
 * @fileoverview unit tests for the redux list selectors factory
 */

import createSelectors from './listSelectorsFactory';

const mockList = [1, 2, 3];
const mockStatus = 'pending';
const mockError = 'error';
const mockState = {
  test: {
    list: mockList,
    status: mockStatus,
    error: mockError,
  },
};

describe('listSelectorsFactory', () => {
  const { selectList, selectListSize, selectError, selectStatus } = createSelectors('test');

  it('should select the list', () => {
    const selected = selectList(mockState);

    expect(selected).toEqual(mockList);
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
