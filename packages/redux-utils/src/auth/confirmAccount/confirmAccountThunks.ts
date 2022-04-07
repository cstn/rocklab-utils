import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, AuthOptions, Payload, AuthError } from '../types';

const defaultTransformError = () => ({ message: 'Confirm account error' });

const createConfirmAccountThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const confirmAccount = createAsyncThunk<Payload, { userId: string; token: string }, { rejectValue: AuthError }>(
    'auth/account/confirm',
    async ({ userId, token }, thunkApi) => {
      try {
        const response = await api.confirmAccount(userId, token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            message: 'No account confirmation response data',
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
    confirmAccount,
  };
};
export default createConfirmAccountThunks;
