/**
 * @fileOverview factory for selectors
 */

import { createSelector } from 'reselect';

const selectState = name => state => (Array.isArray(name) ? state[name[0]][name[1]] : state[name]);

const selectError = name => state => selectState(name)(state).error;

const selectFilter = name => state => selectState(name)(state).filter;

const selectHasMore = name => state => selectState(name)(state).hasMore;

const selectList = name => state => selectState(name)(state).list;

const selectListSize = name => createSelector(selectList(name), list => (list ? list.length : 0));

const selectStatus = name => state => selectState(name)(state).status;

/**
 * create selectors
 * @param name
 * @returns {Object}
 */
export default function createListSelectors(name) {
  return {
    selectError: selectError(name),
    selectFilter: selectFilter(name),
    selectHasMore: selectHasMore(name),
    selectList: selectList(name),
    selectListSize: selectListSize(name),
    selectStatus: selectStatus(name),
  };
}
