import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AuthAPI, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createRegisterThunks = (api: AuthAPI) => {
  const registerUser = createAsyncThunk<Payload, Account, { rejectValue: AuthError }>(
    'auth/session/register',
    async (account: Account, thunkApi) => {
      try {
        const response = await api.register(account);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: (response.data?.message as string) ?? 'Could not register user',
            data: response.data,
          });
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: 'No register response data',
          });
        }

        return response.data || {};
      } catch (ex) {
        return thunkApi.rejectWithValue({
          status: 500,
          message: getErrorMessage(ex),
        });
      }
    }
  );

  return {
    registerUser,
  };
};
export default createRegisterThunks;
