import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AuthAPI, Error, Payload } from '../types';

const createRegisterThunks = (api: AuthAPI) => {
  const registerUser = createAsyncThunk<Payload, Account, { rejectValue: Error }>(
    'auth/session/register',
    async (account: Account, thunkApi) => {
      try {
        const response = await api.register(account);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({ message: 'No register response data' });
        }

        return response.data || {};
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
