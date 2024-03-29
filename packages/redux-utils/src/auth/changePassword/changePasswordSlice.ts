import { createSlice } from '@reduxjs/toolkit';
import initialState from './changePasswordState';
import createChangePasswordThunks from './changePasswordThunks';
import { clear, changePasswordFailure, changePasswordRequest, changePasswordSuccess } from './changePasswordReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const changePasswordSlice = (name: string, api: AuthAPI) => {
  const { changePassword } = createChangePasswordThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(changePassword.pending, changePasswordRequest);
      builder.addCase(changePassword.fulfilled, changePasswordSuccess);
      builder.addCase(changePassword.rejected, changePasswordFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions: { ...actions, changePassword },
    reducer,
  };
};

export default changePasswordSlice;
