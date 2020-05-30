/**
 * @fileOverview unit tests for the redux reducer factory
 */

import { STATUS } from '../status';
import createReducer from './reducerFactory';

const mockInitialState = 1;
const mockHandlers = {
  'test/ACTION': state => state * 2,
};

describe('reducerFactory', () => {
  describe('standard handlers', () => {
    const reducer = createReducer('test', 'standard');

    it('should return the initial state by default', () => {
      const state = reducer(undefined);

      expect(state.data).toEqual({});
      expect(state.error).toBeNull();
      expect(state.status).toEqual(STATUS.IDLE);
    });
  });

  describe('custom handlers', () => {
    const reducer = createReducer('test', 'custom', { initialState: mockInitialState, handlers: mockHandlers });

    it('should return the initial state by default', () => {
      const expected = mockInitialState;

      const state = reducer();

      expect(state).toEqual(expected);
    });

    it('should not change the state if the action is unknown', () => {
      const currentState = 5;
      const expected = 5;

      const newState = reducer(currentState, { type: 'test/ACTION_UNKNOWN' });

      expect(newState).toEqual(expected);
    });

    it('should handle an action', () => {
      const expected = 2;

      const newState = reducer(mockInitialState, {
        type: 'test/ACTION',
      });

      expect(newState).toEqual(expected);
    });
  });
});
