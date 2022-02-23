import { createSlice } from '@reduxjs/toolkit';
import initialState from './requestPasswordState';
import createRequestPasswordThunks from './requestPasswordThunks';
import {
  clear,
  requestPasswordFailure,
  requestPasswordRequest,
  requestPasswordSuccess,
} from './requestPasswordReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const requestPasswordSlice = (name: string, api: AuthAPI) => {
  const { confirmAccount } = createRequestPasswordThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(confirmAccount.pending, requestPasswordRequest);
      builder.addCase(confirmAccount.fulfilled, requestPasswordSuccess);
      builder.addCase(confirmAccount.rejected, requestPasswordFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions,
    reducer,
  };
};

export default requestPasswordSlice;
