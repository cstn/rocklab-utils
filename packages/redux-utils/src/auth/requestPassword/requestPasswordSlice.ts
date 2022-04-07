import { createSlice } from '@reduxjs/toolkit';
import initialState from './requestPasswordState';
import createRequestPasswordThunks from './requestPasswordThunks';
import {
  clear,
  requestPasswordFailure,
  requestPasswordRequest,
  requestPasswordSuccess,
} from './requestPasswordReducer';
import { AuthAPI, AuthOptions } from '../types';

const reducers = {
  clear,
};

const requestPasswordSlice = (name: string, api: AuthAPI, options?: AuthOptions) => {
  const { requestPassword } = createRequestPasswordThunks(api, options);

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
    actions: {
      ...actions,
      requestPassword,
    },
    reducer,
  };
};

export default requestPasswordSlice;
