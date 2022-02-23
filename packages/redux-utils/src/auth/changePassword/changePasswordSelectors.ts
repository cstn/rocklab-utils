import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { ChangePasswordState } from './types';

const selectSelf = (state: RootState) => state.auth.changePassword;

const selectStatus = createSelector(selectSelf, (state: ChangePasswordState) => state.status);
const selectError = createSelector(selectSelf, (state: ChangePasswordState) => state.error);

export { selectStatus, selectError };
