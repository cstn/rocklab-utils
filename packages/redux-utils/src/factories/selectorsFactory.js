/**
 * @fileOverview factory for selectors
 */

const selectState = name => state => name.split('/').reduce((accumulator, current) => accumulator[current], state);

const selectData = name => state => selectState(name)(state).data;

const selectError = name => state => selectState(name)(state).error;

const selectStatus = name => state => selectState(name)(state).status;

/**
 * create selectors
 * @param name
 * @returns {Object}
 */
function createSelectors(name) {
  return {
    selectData: selectData(name),
    selectError: selectError(name),
    selectStatus: selectStatus(name),
  };
}

export default createSelectors;
export { selectState };
