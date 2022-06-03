import { PayloadAction } from '@reduxjs/toolkit';
import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';
import { SessionState } from './types';
import initialState from './sessionState';

const clear = () => initialState;

const loginRequest = (state: SessionState): SessionState => ({
  ...state,
  status: Status.Pending,
});

const loginSuccess = (
  state: SessionState,
  action: PayloadAction<{
    user: User;
    profile: UserProfile;
    access_token: string;
    refresh_token: string;
  }>
): SessionState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
  user: action.payload?.user,
  profile: action.payload?.profile,
  accessToken: action.payload?.access_token,
  refreshToken: action.payload?.refresh_token,
});

const loginFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>): SessionState => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: action.payload,
});

const logoutRequest = (state: SessionState): SessionState => ({
  ...state,
  status: Status.Pending,
  user: undefined,
  profile: undefined,
});

const logoutSuccess = (state: SessionState): SessionState => ({
  ...state,
  status: Status.Resolved,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: undefined,
});

const logoutFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>): SessionState => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: action.payload,
});

const sessionRequest = (state: SessionState): SessionState => ({
  ...state,
  status: Status.Pending,
});

const sessionSuccess = (
  state: SessionState,
  action: PayloadAction<{ user: User; profile: UserProfile }>
): SessionState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
  user: action.payload?.user,
  profile: action.payload?.profile,
});

const sessionFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>): SessionState => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  error: action.payload,
});

export {
  clear,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  sessionFailure,
  sessionRequest,
  sessionSuccess,
};
