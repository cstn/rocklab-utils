import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AuthAPI, AuthError, AuthOptions, Payload } from '../types';

const defaultTransformError = () => ({ message: 'Register error' });

const createRegisterThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const registerUser = createAsyncThunk<Payload, Account, { rejectValue: AuthError }>(
    'auth/session/register',
    async (account: Account, thunkApi) => {
      try {
        const response = await api.register(account);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            message: 'No register response data',
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response.data || {};
      } catch (ex) {
        return thunkApi.rejectWithValue(transformError(ex));
      }
    }
  );

  return {
    registerUser,
  };
};
export default createRegisterThunks;
