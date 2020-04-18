/**
 * @fileOverview factory to create redux actions for lists
 */

/**
 * create action types
 * @param prefix
 * @returns {*}
 */
export const createActionTypes = prefix => ({
  LOAD_REQUEST: `${prefix}/LOAD_REQUEST`,
  LOAD_SUCCESS: `${prefix}/LOAD_SUCCESS`,
  LOAD_FAILURE: `${prefix}/LOAD_FAILURE`,
  MORE_REQUEST: `${prefix}/MORE_REQUEST`,
  MORE_SUCCESS: `${prefix}/MORE_SUCCESS`,
  MORE_FAILURE: `${prefix}/MORE_FAILURE`,
});

/**
 * create action creators
 * @param name
 * @returns {*}
 */
export const createActions = name => {
  const prefix = name.charAt(0).toLowerCase() + name.slice(1);

  const actionTypes = createActionTypes(prefix);

  return {
    loadRequestAction: filter => ({
      type: actionTypes.LOAD_REQUEST,
      filter,
    }),
    loadSuccessAction: payload => ({
      type: actionTypes.LOAD_SUCCESS,
      payload,
    }),
    loadFailureAction: (error, code) => ({
      type: actionTypes.LOAD_FAILURE,
      error,
      code,
    }),
    moreRequestAction: (filter, offset) => ({
      type: actionTypes.MORE_REQUEST,
      filter,
      offset,
    }),
    moreSuccessAction: payload => ({
      type: actionTypes.MORE_SUCCESS,
      payload,
    }),
    moreFailureAction: (error, code) => ({
      type: actionTypes.MORE_FAILURE,
      error,
      code,
    }),
  };
};
