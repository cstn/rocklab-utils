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
  const { requestPassword } = createRequestPasswordThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(requestPassword.pending, requestPasswordRequest);
      builder.addCase(requestPassword.fulfilled, requestPasswordSuccess);
      builder.addCase(requestPassword.rejected, requestPasswordFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions,
    reducer,
  };
};

export default requestPasswordSlice;
