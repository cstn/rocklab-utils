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
  error: null,
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
  error: null,
  filter: action.filter || state.filter,
  hasMore: true,
  status: STATUS.PENDING,
});

const handleSuccess = converter => (state, action) => ({
  ...state,
  error: null,
  list: action.payload ? action.payload.map(converter) : null,
  status: STATUS.RESOLVED,
});

const handleMoreSuccess = converter => (state, action) => ({
  ...state,
  error: null,
  hasMore: action.payload && action.payload.length > 0,
  list: [...state.list, ...action.payload.map(converter)],
  status: STATUS.RESOLVED,
});

/**
 * create list handlers
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @param {Object} options
 * @param {function} options.converter  converter for results
 * @returns {Object}
 */
const createHandlers = (moduleName, featureName, {converter}) => {
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
