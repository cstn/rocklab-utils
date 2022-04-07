import { createSlice } from '@reduxjs/toolkit';
import initialState from './resetPasswordState';
import createResetPasswordThunks from './resetPasswordThunks';
import { clear, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess } from './resetPasswordReducer';
import { AuthAPI, AuthOptions } from '../types';

const reducers = {
  clear,
};

const resetPasswordSlice = (name: string, api: AuthAPI, options?: AuthOptions) => {
  const { resetPassword } = createResetPasswordThunks(api, options);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(resetPassword.pending, resetPasswordRequest);
      builder.addCase(resetPassword.fulfilled, resetPasswordSuccess);
      builder.addCase(resetPassword.rejected, resetPasswordFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions: {
      ...actions,
      resetPassword,
    },
    reducer,
  };
};

export default resetPasswordSlice;
