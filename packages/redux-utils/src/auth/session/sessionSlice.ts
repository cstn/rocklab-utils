import { createSlice } from '@reduxjs/toolkit';
import initialState from './sessionState';
import createSessionThunks from './sessionThunks';
import {
  clear,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  sessionFailure,
  sessionRequest,
  sessionSuccess,
} from './sessionReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const sessionSlice = (name: string, api: AuthAPI) => {
  const { loginUser, logoutUser, sessionUser } = createSessionThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(loginUser.pending, loginRequest);
      builder.addCase(loginUser.fulfilled, loginSuccess);
      builder.addCase(loginUser.rejected, loginFailure);

      builder.addCase(logoutUser.pending, logoutRequest);
      builder.addCase(logoutUser.fulfilled, logoutSuccess);
      builder.addCase(logoutUser.rejected, logoutFailure);

      builder.addCase(sessionUser.pending, sessionRequest);
      builder.addCase(sessionUser.fulfilled, sessionSuccess);
      builder.addCase(sessionUser.rejected, sessionFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions,
    reducer,
    loginUser,
    logoutUser,
    sessionUser,
  };
};

export default sessionSlice;
