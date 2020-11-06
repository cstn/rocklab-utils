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
  const name = [moduleName, featureName].filter(Boolean).join('/');

  return {
    selectError: selectError(name),
    selectFilter: selectFilter(name),
    selectHasMore: selectHasMore(name),
    selectList: selectList(name),
    selectListSize: selectListSize(name),
    selectStatus: selectStatus(name),
  };
}

export default createListSelectors;
