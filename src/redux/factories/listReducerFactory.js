/**
 * @fileOverview factory for redux lists reducers
 */

import { STATUS } from '../status';
import createBaseReducer from './reducerFactory';
import { createActionTypes } from './listActionsFactory';

/**
 * initial state
 * @type {{filter: null, hasMore: boolean, error: string, list: null, status: string}}
 */
export const initialState = {
  error: '',
  filter: null,
  hasMore: true,
  list: null,
  status: STATUS.IDLE,
};

/*
 * case reducer
 */
const handleError = (state, action) =>
  action.code === 404
    ? {
      ...state,
      error: null,
      hasMore: false,
      list: [],
      status: STATUS.RESOLVED,
    }
    : {
      ...state,
      error: action.error,
      list: null,
      status: STATUS.REJECTED,
    };

const handleMoreError = (state, action) =>
  action.code === 404
    ? {
      ...state,
      error: null,
      hasMore: false,
      status: STATUS.RESOLVED,
    }
    : {
      ...state,
      error: action.error,
      status: STATUS.REJECTED,
    };

const handleRequest = (state, action) => ({
  ...state,
  error: '',
  filter: action.filter || state.filter,
  hasMore: true,
  status: STATUS.PENDING,
});

const handleSuccess = converter => (state, action) => ({
  ...state,
  error: '',
  list: converter(action.payload),
  status: STATUS.RESOLVED,
});

const handleMoreSuccess = converter => (state, action) => ({
  ...state,
  error: '',
  hasMore: action.payload && action.payload.length > 0,
  list: [...state.list, ...converter(action.payload)],
  status: STATUS.RESOLVED,
});

/**
 * create list handlers
 * @param name
 * @param dataConverter
 * @returns {*}
 */
const createHandlers = (name, { dataConverter }) => {
  const actionTypes = createActionTypes(name);
  const converter = items => (dataConverter ? items.map(item => dataConverter(item)) : items);

  return {
    [actionTypes.LOAD_REQUEST]: handleRequest,
    [actionTypes.LOAD_SUCCESS]: handleSuccess(converter),
    [actionTypes.LOAD_FAILURE]: handleError,

    [actionTypes.MORE_REQUEST]: handleRequest,
    [actionTypes.MORE_SUCCESS]: handleMoreSuccess(converter),
    [actionTypes.MORE_FAILURE]: handleMoreError,
  };
};

/**
 * create list reducer
 * @param name
 * @param {Object} options
 * @returns {*}
 */
export default function createReducer(name, options = {}) {
  return createBaseReducer(initialState, createHandlers(name, options));
}
