/**
 * @fileOverview factory for selectors
 */

const selectState = name => state => name.split('/').reduce((accumulator, current) => accumulator[current], state);

const selectData = name => state => selectState(name)(state).data;

const selectError = name => state => selectState(name)(state).error;

const selectLoadedAt = name => state => selectState(name)(state).loadedAt;

const selectStatus = name => state => selectState(name)(state).status;

/**
 * create selectors
 * @param {String} moduleName   the module name
 * @param {String} featureName  the feature name
 * @returns {Object}
 */
function createSelectors(moduleName, featureName) {
  const name = [moduleName, featureName].filter(Boolean).join('/');

  return {
    selectData: selectData(name),
    selectError: selectError(name),
    selectLoadedAt: selectLoadedAt(name),
    selectStatus: selectStatus(name),
  };
}

export default createSelectors;
export { selectState };
