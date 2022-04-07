import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { RequestPasswordState } from './types';
import { SessionState } from '../session/types';

const selectSelf = (state: RootState) => state.auth.requestPassword;

const selectStatus = createSelector(selectSelf, (state: RequestPasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: RequestPasswordState) => state.error);
const selectEmail = createSelector(selectSelf, (state: RequestPasswordState) => state.email);
const selectErrorMessage = createSelector(
  selectSelf,
  (state: SessionState) => state.error?.message ?? 'Reset password error'
);

export { selectStatus, selectError, selectEmail, selectErrorMessage };
