import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { ResetPasswordState } from './types';
import { SessionState } from '../session/types';

const selectSelf = (state: RootState) => state.auth.resetPassword;

const selectStatus = createSelector(selectSelf, (state: ResetPasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: ResetPasswordState) => state.error);
const selectErrorMessage = createSelector(
  selectSelf,
  (state: SessionState) => state.error?.message ?? 'Reset password error'
);

export { selectStatus, selectError, selectErrorMessage };
