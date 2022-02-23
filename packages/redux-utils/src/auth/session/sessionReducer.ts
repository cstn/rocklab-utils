import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './sessionState';
import { Status } from '../../status';
import { Error, Response } from '../types';
import { SessionState } from './types';

const clear = () => initialState;

const loginRequest = (state: SessionState) => ({
  ...state,
  status: Status.Pending,
});

const loginSuccess = (state: SessionState, action: PayloadAction<Response>) => ({
  ...state,
  status: Status.Resolved,
  error: null,
  user: action.payload.data?.user,
  profile: action.payload.data?.profile,
});

const loginFailure = (state: SessionState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  error: action.payload?.message || 'Login error',
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
  token: undefined,
  error: null,
});

const logoutFailure = (state: SessionState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  token: undefined,
  error: action.payload?.message || 'Login error',
});

const sessionRequest = (state: SessionState) => ({
  ...state,
  status: Status.Pending,
});

const sessionSuccess = (state: SessionState, action: PayloadAction<Response>) => ({
  ...state,
  status: Status.Resolved,
  error: null,
  user: action.payload.data?.user,
  profile: action.payload.data?.profile,
});

const sessionFailure = (state: SessionState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  user: undefined,
  profile: undefined,
  error: action.payload?.message || 'Login error',
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
