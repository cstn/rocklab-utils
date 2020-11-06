/**
 * @fileOverview reducer factory
 */

/**
 * create a reducer
 * @param {Object} handlers  the action handlers as map action => handler
 * @param {*} initialState
 * @returns {function}
 */
function createReducer(handlers, initialState) {
  return function reducer(state = initialState, action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}
export default createReducer;
