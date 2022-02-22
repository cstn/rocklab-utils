import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { ConfirmState } from './types';

const selectSelf = (state: RootState) => state.auth.confirm;

const selectStatus = createSelector(selectSelf, (state: ConfirmState) => state.status);
const selectError = createSelector(selectSelf, (state: ConfirmState) => state.error);

export { selectStatus, selectError };
