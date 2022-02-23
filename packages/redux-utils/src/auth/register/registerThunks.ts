import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AuthAPI, Error, Response } from '../types';

const createRegisterThunks = (api: AuthAPI) => {
  const registerUser = createAsyncThunk<Response, Account, { rejectValue: Error }>(
    'auth/session/register',
    async (account: Account, thunkApi) => {
      try {
        const response = await api.register(account);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not register a new account' });
      }
    }
  );

  return {
    registerUser,
  };
};
export default createRegisterThunks;
