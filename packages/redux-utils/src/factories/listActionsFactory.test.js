/**
 * @fileOverview unit tests for the redux list actions factory
 */

import { createActionTypes, createActions } from './listActionsFactory';

describe('listActionsFactory', () => {
  it('should create action types', () => {
    const actionTypes = createActionTypes('test', 'a');

    expect(actionTypes).toEqual({
      LOAD_REQUEST: 'test/a/LOAD_REQUEST',
      LOAD_SUCCESS: 'test/a/LOAD_SUCCESS',
      LOAD_FAILURE: 'test/a/LOAD_FAILURE',
      MORE_REQUEST: 'test/a/MORE_REQUEST',
      MORE_SUCCESS: 'test/a/MORE_SUCCESS',
      MORE_FAILURE: 'test/a/MORE_FAILURE',
    });
  });

  it('should create actions', () => {
    const filter = { a: 1 };

    const actions = createActions('test', 'a');

    expect(actions.loadRequestAction(filter)).toEqual({
      type: 'test/a/LOAD_REQUEST',
      filter,
    });
    expect(actions.loadSuccessAction([1, 2], 2, 10)).toEqual({
      type: 'test/a/LOAD_SUCCESS',
      items: [1, 2],
      count: 2,
      total: 10,
    });
    expect(actions.loadFailureAction('error', 500)).toEqual({
      type: 'test/a/LOAD_FAILURE',
      error: 'error',
      code: 500,
    });
    expect(actions.moreRequestAction(filter, 10)).toEqual({
      type: 'test/a/MORE_REQUEST',
      filter,
      offset: 10,
    });
    expect(actions.moreSuccessAction([3, 4], 2, 10)).toEqual({
      type: 'test/a/MORE_SUCCESS',
      items: [3, 4],
      total: 10,
      count: 2,
    });
    expect(actions.moreFailureAction('error', 500)).toEqual({
      type: 'test/a/MORE_FAILURE',
      error: 'error',
      code: 500,
    });
  });
});
