import { createSelector } from 'reselect';
import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';
import { RootState } from '../types';
import selectAuth from '../authSelectors';
import { AuthError } from '../utils/errors';
import { SessionState } from './types';

const selectSelf: <S extends RootState>(state: S) => SessionState = createSelector(
  selectAuth,
  (state) => state.session
);

const selectSessionUser: <S extends RootState>(state: S) => User | undefined = createSelector(
  selectSelf,
  (state: SessionState) => state.user
);

const selectSessionUserProfile: <S extends RootState>(state: S) => UserProfile | undefined = createSelector(
  selectSelf,
  (state: SessionState) => state.profile
);

const selectSessionAccessToken: <S extends RootState>(state: S) => string | undefined = createSelector(
  selectSelf,
  (state: SessionState) => state.accessToken
);

const selectSessionRefreshToken: <S extends RootState>(state: S) => string | undefined = createSelector(
  selectSelf,
  (state: SessionState) => state.refreshToken
);

const selectSessionStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: SessionState) => state.status
);

const selectSessionError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: SessionState) => state.error
);

export {
  selectSessionAccessToken,
  selectSessionRefreshToken,
  selectSessionUser,
  selectSessionUserProfile,
  selectSessionStatus,
  selectSessionError,
};
