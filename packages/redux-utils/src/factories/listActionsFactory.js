/**
 * @fileOverview factory to create redux actions for lists
 */

/**
 * create action types
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @returns {Object}
 */
const createActionTypes = (moduleName, featureName) => ({
  LOAD_REQUEST: `${moduleName}/${featureName}/LOAD_REQUEST`,
  LOAD_SUCCESS: `${moduleName}/${featureName}/LOAD_SUCCESS`,
  LOAD_FAILURE: `${moduleName}/${featureName}/LOAD_FAILURE`,
  MORE_REQUEST: `${moduleName}/${featureName}/MORE_REQUEST`,
  MORE_SUCCESS: `${moduleName}/${featureName}/MORE_SUCCESS`,
  MORE_FAILURE: `${moduleName}/${featureName}/MORE_FAILURE`,
});

/**
 * create action creators
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @returns {*}
 */
const createActions = (moduleName, featureName) => {
  const actionTypes = createActionTypes(moduleName, featureName);

  return {
    loadRequestAction: filter => ({
      type: actionTypes.LOAD_REQUEST,
      filter,
    }),
    loadSuccessAction: (items, count, total) => ({
      type: actionTypes.LOAD_SUCCESS,
      items,
      count,
      total,
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
    moreSuccessAction: (items, count, total) => ({
      type: actionTypes.MORE_SUCCESS,
      items,
      count,
      total,
    }),
    moreFailureAction: (error, code) => ({
      type: actionTypes.MORE_FAILURE,
      error,
      code,
    }),
  };
};

export { createActionTypes, createActions };
