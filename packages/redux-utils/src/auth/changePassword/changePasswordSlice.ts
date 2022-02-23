import { createSlice } from '@reduxjs/toolkit';
import initialState from './changePasswordState';
import createChangePasswordThunks from './changePasswordThunks';
import { clear, changePasswordFailure, changePasswordRequest, changePasswordSuccess } from './changePasswordReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const changePasswordSlice = (name: string, api: AuthAPI) => {
  const { confirmAccount } = createChangePasswordThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(confirmAccount.pending, changePasswordRequest);
      builder.addCase(confirmAccount.fulfilled, changePasswordSuccess);
      builder.addCase(confirmAccount.rejected, changePasswordFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions,
    reducer,
  };
};

export default changePasswordSlice;
