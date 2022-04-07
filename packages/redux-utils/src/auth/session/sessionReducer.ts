import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './sessionState';
import { Status } from '../../status';
import { AuthError } from '../types';
import { SessionPayload, SessionState } from './types';

const clear = () => initialState;

const loginRequest = (state: SessionState) => ({
  ...state,
  status: Status.Pending,
});

const loginSuccess = (state: SessionState, action: PayloadAction<SessionPayload>) => ({
  ...state,
  status: Status.Resolved,
  error: null,
  user: action.payload.user,
  profile: action.payload.profile,
  accessToken: action.payload.access_token,
  refreshToken: action.payload.refresh_token,
});

const loginFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>) => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: action.payload,
});

const logoutRequest = (state: SessionState) => ({
  ...state,
  status: Status.Pending,
  user: undefined,
  profile: undefined,
});

const logoutSuccess = (state: SessionState) => ({
  ...state,
  status: Status.Resolved,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: null,
});

const logoutFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>) => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: action.payload,
});

const sessionRequest = (state: SessionState) => ({
  ...state,
  status: Status.Pending,
});

const sessionSuccess = (state: SessionState, action: PayloadAction<SessionPayload>) => ({
  ...state,
  status: Status.Resolved,
  error: null,
  user: action.payload.user,
  profile: action.payload.profile,
});

const sessionFailure = (state: SessionState, action: Partial<PayloadAction<AuthError>>) => ({
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
