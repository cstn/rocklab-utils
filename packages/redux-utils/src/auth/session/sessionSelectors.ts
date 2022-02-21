import { createSelector } from 'reselect';
import { RootState, SessionState } from '../types';

const selectSelf = (state: RootState) => state.auth.session;

const selectUser = createSelector(selectSelf, (state: SessionState) => state.user);
const selectUserProfile = createSelector(selectSelf, (state: SessionState) => state.profile);
const selectAccessToken = createSelector(selectSelf, (state: SessionState) => state.token);

export { selectAccessToken, selectUser, selectUserProfile };
