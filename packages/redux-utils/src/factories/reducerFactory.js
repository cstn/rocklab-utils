/**
 * @fileOverview factory to create redux reducers
 */

import { STATUS } from '../status';
import { createActionTypes } from './actionsFactory';

const initialState = {
  data: {},
  error: null,
  loadedAt: null,
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
        data: {},
        loadedAt: new Date(),
        status: STATUS.RESOLVED,
      }
    : {
        ...state,
        error: action.error,
        data: {},
        loadedAt: null,
        status: STATUS.REJECTED,
      };

const handleRequest = (state) => ({
  ...state,
  error: null,
  status: STATUS.PENDING,
});

const handleSuccess = (converter) =>
  function success(state, action) {
    return {
      ...state,
      error: null,
      data: action.payload ? converter(action.payload) : {},
      loadedAt: new Date(),
      status: STATUS.RESOLVED,
    };
  };

/**
 * create handlers
 * @param moduleName
 * @param featureName
 * @param {Object} options
 * @param {function} options.converter  converter for result items
 * @returns {*}
 */
const createHandlers = (moduleName, featureName, { converter }) => {
  const actionTypes = createActionTypes(moduleName, featureName);

  return {
    [actionTypes.REQUEST]: handleRequest,
    [actionTypes.SUCCESS]: handleSuccess(converter),
    [actionTypes.FAILURE]: handleError,
  };
};

/**
 * create reducer
 * @param moduleName
 * @param featureName
 * @param {Object} options
 * @param {Object} options.initialState
 * @param {Object} options.handlers
 * @param {function} options.converter  converter for result items
 * @returns {function}
 */
function createReducer(moduleName, featureName, options = {}) {
  const customOptions = {
    converter: (item) => item,
    ...options,
  };

  const handlers = options.handlers || createHandlers(moduleName, featureName, customOptions);
  const initialReducerState = options.initialState || initialState;

  return function reducer(state = initialReducerState, action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export default createReducer;
