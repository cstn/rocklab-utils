import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { ChangePasswordState } from './types';
import { SessionState } from '../session/types';

const selectSelf = (state: RootState) => state.auth.changePassword;

const selectStatus = createSelector(selectSelf, (state: ChangePasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: ChangePasswordState) => state.error);
const selectErrorMessage = createSelector(
  selectSelf,
  (state: SessionState) => state.error?.message ?? 'Change password error'
);

export { selectStatus, selectError, selectErrorMessage };
