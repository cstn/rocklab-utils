import { createSlice } from '@reduxjs/toolkit';
import initialState from './resetPasswordState';
import createResetPasswordThunks from './resetPasswordThunks';
import { clear, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess } from './resetPasswordReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const resetPasswordSlice = (name: string, api: AuthAPI) => {
  const { resetPassword } = createResetPasswordThunks(api);

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
    actions,
    reducer,
  };
};

export default resetPasswordSlice;
