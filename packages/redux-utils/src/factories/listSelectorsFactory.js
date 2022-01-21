/**
 * @fileOverview factory for selectors
 */

import { createSelector } from 'reselect';

import { selectState } from './selectorsFactory';

const selectError = (name) => (state) => selectState(name)(state).error;

const selectFilter = (name) => (state) => selectState(name)(state).filter;

const selectOffset = (name) => (state) => selectState(name)(state).offset;

const selectLimit = (name) => (state) => selectState(name)(state).limit;

const selectHasMore = (name) => (state) => selectState(name)(state).hasMore;

const selectList = (name) => (state) => selectState(name)(state).list;

const selectListSize = (name) => createSelector(selectList(name), (list) => (list ? list.length : 0));

const selectLoadedAt = (name) => (state) => selectState(name)(state).loadedAt;

const selectLoadedMoreAt = (name) => (state) => selectState(name)(state).loadedMoreAt;

const selectCount = (name) => (state) => selectState(name)(state).count;

const selectTotal = (name) => (state) => selectState(name)(state).total;

const selectStatus = (name) => (state) => selectState(name)(state).status;

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
    selectLimit: selectLimit(name),
    selectOffset: selectOffset(name),
    selectHasMore: selectHasMore(name),
    selectList: selectList(name),
    selectLoadedAt: selectLoadedAt(name),
    selectLoadedMoreAt: selectLoadedMoreAt(name),
    selectCount: selectCount(name),
    selectTotal: selectTotal(name),
    selectListSize: selectListSize(name),
    selectStatus: selectStatus(name),
  };
}

export default createListSelectors;
