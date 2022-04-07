import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, AuthError, AuthOptions, Payload } from '../types';

const defaultTransformError = () => ({ message: 'Request password error' });

const createRequestPasswordThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const requestPassword = createAsyncThunk<Payload, { email: string }, { rejectValue: AuthError }>(
    'auth/password/request',
    async ({ email }, thunkApi) => {
      try {
        const response = await api.requestPassword(email);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            message: 'No request password response data',
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
    requestPassword,
  };
};
export default createRequestPasswordThunks;
