import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { ResetPasswordState } from './types';

const selectSelf = (state: RootState) => state.auth.resetPassword;

const selectStatus = createSelector(selectSelf, (state: ResetPasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: ResetPasswordState) => state.error);

export { selectStatus, selectError };
