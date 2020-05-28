/**
 * @fileOverview factory to create redux reducers
 */

import { STATUS } from '../status';
import { createActionTypes } from './actionsFactory';

const initialState = {
  data: null,
  error: null,
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
      status: STATUS.RESOLVED,
    }
    : {
      ...state,
      error: action.error,
      data: {},
      status: STATUS.REJECTED,
    };

const handleRequest = state => ({
  ...state,
  error: null,
  status: STATUS.PENDING,
});

const handleSuccess = (state, action) => ({
  ...state,
  error: null,
  data: action.payload,
  status: STATUS.RESOLVED,
});

/**
 * create handlers
 * @param moduleName
 * @param featureName
 * @returns {*}
 */
const createHandlers = (moduleName, featureName) => {
  const actionTypes = createActionTypes(moduleName, featureName);

  return {
    [actionTypes.LOAD_REQUEST]: handleRequest,
    [actionTypes.LOAD_SUCCESS]: handleSuccess,
    [actionTypes.LOAD_FAILURE]: handleError,
  };
};

/**
 * create reducer
 * @param moduleName
 * @param featureName
 * @param {Object} options
 * @param {Object} options.initialState
 * @param {Object} options.handlers
 * @returns {function}
 */
function createReducer(moduleName, featureName, options = {}) {
  const handlers = options.handlers || createHandlers(moduleName, featureName);

  return function reducer(state = options.initialState || initialState, action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export default createReducer;
