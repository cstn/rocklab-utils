import { createSlice } from '@reduxjs/toolkit';
import initialState from './confirmAccontState';
import createConfirmAccountThunks from './confirmAccountThunks';
import { clear, confirmAccountFailure, confirmAccountSuccess, confirmAccountRequest } from './confirmAccountReducer';
import { AuthAPI, AuthOptions } from '../types';

const reducers = {
  clear,
};

const confirmAccountSlice = (name: string, api: AuthAPI, options?: AuthOptions) => {
  const { confirmAccount } = createConfirmAccountThunks(api, options);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(confirmAccount.pending, confirmAccountRequest);
      builder.addCase(confirmAccount.fulfilled, confirmAccountSuccess);
      builder.addCase(confirmAccount.rejected, confirmAccountFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions: { ...actions, confirmAccount },
    reducer,
  };
};

export default confirmAccountSlice;
