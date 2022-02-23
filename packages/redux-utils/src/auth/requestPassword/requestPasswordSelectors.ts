import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { RequestPasswordState } from './types';

const selectSelf = (state: RootState) => state.auth.requestPassword;

const selectStatus = createSelector(selectSelf, (state: RequestPasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: RequestPasswordState) => state.error);
const selectEmail = createSelector(selectSelf, (state: RequestPasswordState) => state.email);

export { selectStatus, selectError, selectEmail };
