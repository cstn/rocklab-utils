/**
 * @fileOverview factory for redux lists reducers
 */

import { STATUS } from '../status';
import createBaseReducer from './reducerFactory';
import { createActionTypes } from './listActionsFactory';

/**
 * initial state
 * @type {Object}
 */
const initialState = {
  count: undefined,
  error: null,
  filter: null,
  hasMore: true,
  limit: null,
  list: null,
  offset: 0,
  order: null,
  status: STATUS.IDLE,
  total: undefined,
};

/*
 * case reducer
 */
const handleError = (state, { code, error }) =>
  code === 404
    ? {
      ...state,
      count: 0,
      error: null,
      hasMore: false,
      list: [],
      status: STATUS.RESOLVED,
    }
    : {
      ...state,
      count: undefined,
      error,
      list: null,
      status: STATUS.REJECTED,
      total: undefined,
    };

const handleMoreError = (state, { code, error }) =>
  code === 404
    ? {
      ...state,
      error: null,
      hasMore: false,
      status: STATUS.RESOLVED,
    }
    : {
      ...state,
      error,
      status: STATUS.REJECTED,
    };

const handleRequest = (state, { filter, limit, offset, order }) => ({
  ...state,
  error: null,
  filter: filter || state.filter,
  hasMore: true,
  limit: limit || state.limit,
  offset: offset || state.offset,
  order,
  status: STATUS.PENDING,
});

const handleSuccess = converter => (state, { count, payload, total }) => ({
  ...state,
  count: count || payload.length || 0,
  error: null,
  list: payload ? payload.map(converter) : null,
  status: STATUS.RESOLVED,
  total: total || count || payload.length || 0,
});

const handleMoreSuccess = converter => (state, { count, payload, total }) => ({
  ...state,
  count: state.count + count,
  error: null,
  hasMore: payload && payload.length > 0,
  list: [...state.list, ...payload.map(converter)],
  status: STATUS.RESOLVED,
  total: total || state.total,
});

/**
 * create list handlers
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @param {Object} options
 * @param {function} options.converter  converter for results
 * @returns {Object}
 */
const createHandlers = (moduleName, featureName, { converter }) => {
  const actionTypes = createActionTypes(moduleName, featureName);

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
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @param {Object} options
 * @param {function} options.converter  converter for result items
 * @returns {*}
 */
function createReducer(moduleName, featureName, options = {}) {
  const customOptions = {
    converter: item => item,
    ...options,
  };

  const handlers = createHandlers(moduleName, featureName, customOptions);

  return createBaseReducer(moduleName, featureName, { initialState, handlers });
}

export default createReducer;
export { initialState };
