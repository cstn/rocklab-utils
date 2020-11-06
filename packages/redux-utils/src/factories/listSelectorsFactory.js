/**
 * @fileOverview factory for selectors
 */

import { createSelector } from 'reselect';

import { selectState } from './selectorsFactory';

const selectError = name => state => selectState(name)(state).error;

const selectFilter = name => state => selectState(name)(state).filter;

const selectHasMore = name => state => selectState(name)(state).hasMore;

const selectList = name => state => selectState(name)(state).list;

const selectListSize = name => createSelector(selectList(name), list => (list ? list.length : 0));

const selectStatus = name => state => selectState(name)(state).status;

/**
 * create selectors
 * @param {String} moduleName   the module name
 * @param {String} featureName  the feature name
 * @returns {Object}
 */
function createListSelectors(moduleName, featureName) {
  return {
    selectError: selectError(moduleName, featureName),
    selectFilter: selectFilter(moduleName, featureName),
    selectHasMore: selectHasMore(moduleName, featureName),
    selectList: selectList(moduleName, featureName),
    selectListSize: selectListSize(moduleName, featureName),
    selectStatus: selectStatus(moduleName, featureName),
  };
}

export default createListSelectors;
