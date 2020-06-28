import { createActionTypes, createActions } from './actionsFactory';

describe('actionsFactory', () => {
  it('should create action types', () => {
    const actionTypes = createActionTypes('test', 'a');

    expect(actionTypes).toEqual({
      REQUEST: 'test/a/REQUEST',
      SUCCESS: 'test/a/SUCCESS',
      FAILURE: 'test/a/FAILURE',
    });
  });

  it('should create actions', () => {
    const actions = createActions('test', 'a');

    expect(actions.requestAction()).toEqual({
      type: 'test/a/REQUEST',
    });
    expect(actions.successAction({ a: 1 })).toEqual({
      type: 'test/a/SUCCESS',
      payload: { a: 1 },
    });
    expect(actions.failureAction('error', 500)).toEqual({
      type: 'test/a/FAILURE',
      error: 'error',
      code: 500,
    });
  });
});
