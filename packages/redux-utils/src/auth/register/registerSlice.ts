import { createSlice } from '@reduxjs/toolkit';
import initialState from './registerState';
import createRegisterThunks from './registerThunks';
import { clear, registerFailure, registerRequest, registerSuccess } from './registerReducer';
import { AuthAPI } from '../types';

const reducers = {
  clear,
};

const registerSlice = (name: string, api: AuthAPI) => {
  const { registerUser } = createRegisterThunks(api);

  const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, registerRequest);
      builder.addCase(registerUser.fulfilled, registerSuccess);
      builder.addCase(registerUser.rejected, registerFailure);
    },
  });

  const { actions, reducer } = slice;

  return {
    actions: {
      ...actions,
      registerUser,
    },
    reducer,
  };
};

export default registerSlice;
