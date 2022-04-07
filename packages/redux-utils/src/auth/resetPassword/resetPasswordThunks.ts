import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, AuthError, AuthOptions, Payload } from '../types';

const defaultTransformError = () => ({ message: 'reset password error' });

const createResetPasswordThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const resetPassword = createAsyncThunk<Payload, { token: string; newPassword: string }, { rejectValue: AuthError }>(
    'auth/password/reset',
    async ({ token, newPassword }, thunkApi) => {
      try {
        const response = await api.resetPassword(token, newPassword);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            message: 'No reset password response data',
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
    resetPassword,
  };
};
export default createResetPasswordThunks;
