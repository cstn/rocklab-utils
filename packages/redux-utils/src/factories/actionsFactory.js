/**
 * @fileOverview factory to create redux actions for standard actions
 */

/**
 * create action types
 * @param {String} moduleName   the actions prefix, e.g. the module name
 * @param {String} featureName   the feature name
 * @returns {*}
 */
const createActionTypes = (moduleName, featureName) => ({
  REQUEST: `${moduleName}/${featureName}/REQUEST`,
  SUCCESS: `${moduleName}/${featureName}/SUCCESS`,
  FAILURE: `${moduleName}/${featureName}/FAILURE`,
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
    requestAction: () => ({
      type: actionTypes.REQUEST,
    }),
    successAction: payload => ({
      type: actionTypes.SUCCESS,
      payload,
    }),
    failureAction: (error, code) => ({
      type: actionTypes.FAILURE,
      error,
      code,
    }),
  };
};

export { createActionTypes, createActions };
