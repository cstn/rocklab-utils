/**
 * @fileOverview unit test for the redux list reducer factory
 */

import { STATUS } from '../status';
import { createActionTypes } from './listActionsFactory';
import createListReducer, { initialState } from './listReducerFactory';

describe('createListReducerFactors', () => {
  const reducer = createListReducer('test', 'a');
  const actionTypes = createActionTypes('test', 'a');

  it('should have an initial state', () => {
    const state = initialState;

    expect(state.status).toEqual(STATUS.IDLE);
    expect(state.list).toBeNull();
    expect(state.error).toBeNull();
    expect(state.filter).toBeNull();
    expect(state.loadedAt).toBeNull();
  });

  it('should handle load request action', () => {
    const filter = { a: 1 };
    const limit = 10;
    const offset = 5;
    const order = 'id';

    const state = reducer(initialState, {
      type: actionTypes.LOAD_REQUEST,
      filter,
      limit,
      offset,
      order,
    });

    expect(state.status).toEqual(STATUS.PENDING);
    expect(state.error).toBeNull();
    expect(state.filter).toEqual(filter);
    expect(state.limit).toEqual(limit);
    expect(state.offset).toEqual(offset);
    expect(state.order).toEqual(order);
    expect(state.loadedAt).toBeNull();
  });

  it('should handle load success action', () => {
    const state = reducer(
      {
        status: STATUS.PENDING,
        list: null,
      },
      {
        type: actionTypes.LOAD_SUCCESS,
        items: [1, 2, 3],
        count: 3,
        total: 5,
      }
    );

    expect(state.status).toEqual(STATUS.RESOLVED);
    expect(state.error).toBeNull();
    expect(state.list).toEqual([1, 2, 3]);
    expect(state.count).toEqual(3);
    expect(state.total).toEqual(5);
    expect(state.loadedAt).not.toBeNull();
  });

  it('should handle load success action with converter', () => {
    const convertReducer = createListReducer('test', 'a', { converter: i => i * 2 });

    const state = convertReducer(
      {
        status: STATUS.PENDING,
        list: null,
      },
      {
        type: actionTypes.LOAD_SUCCESS,
        items: [1, 2, 3],
      }
    );

    expect(state.status).toEqual(STATUS.RESOLVED);
    expect(state.error).toBeNull();
    expect(state.list).toEqual([2, 4, 6]);
  });

  it('should handle load failure action', () => {
    const error = 'error';
    const state = reducer(
      {
        status: STATUS.PENDING,
        list: [1, 2, 3],
      },
      {
        type: actionTypes.LOAD_FAILURE,
        error,
      }
    );

    expect(state.status).toEqual(STATUS.REJECTED);
    expect(state.error).toEqual(error);
    expect(state.list).toBeNull();
    expect(state.loadedAt).toBeNull();
  });

  it('should handle load more request action', () => {
    const filter = { a: 1 };
    const state = reducer(
      {
        filter,
        status: STATUS.IDLE,
        list: null,
      },
      {
        type: actionTypes.MORE_REQUEST,
      }
    );

    expect(state.status).toEqual(STATUS.PENDING);
    expect(state.error).toBeNull();
    expect(state.filter).toEqual(filter);
  });

  it('should handle load more success action', () => {
    const state = reducer(
      {
        status: STATUS.PENDING,
        list: [2, 4, 6],
      },
      {
        type: actionTypes.MORE_SUCCESS,
        items: [4, 5, 6],
      }
    );

    expect(state.status).toEqual(STATUS.RESOLVED);
    expect(state.error).toBeNull();
    expect(state.list).toEqual([2, 4, 6, 4, 5, 6]);
  });

  it('should handle load more failure action', () => {
    const error = 'error';
    const state = reducer(
      {
        status: STATUS.PENDING,
        list: [1, 2, 3],
      },
      {
        type: actionTypes.MORE_FAILURE,
        error,
      }
    );

    expect(state.status).toEqual(STATUS.REJECTED);
    expect(state.error).toEqual(error);
    expect(state.list).toEqual([1, 2, 3]);
  });
});
