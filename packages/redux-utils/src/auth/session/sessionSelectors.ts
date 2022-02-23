import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { SessionState } from './types';

const selectSelf = (state: RootState) => state.auth.session;

const selectUser = createSelector(selectSelf, (state: SessionState) => state.user);
const selectUserProfile = createSelector(selectSelf, (state: SessionState) => state.profile);
const selectAccessToken = createSelector(selectSelf, (state: SessionState) => state.token);
const selectStatus = createSelector(selectSelf, (state: SessionState) => state.status);
const selectError = createSelector(selectSelf, (state: SessionState) => state.error);

export { selectAccessToken, selectUser, selectUserProfile, selectStatus, selectError };
