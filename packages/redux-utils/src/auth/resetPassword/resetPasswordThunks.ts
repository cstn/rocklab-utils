import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createResetPasswordThunks = (api: AuthAPI) => {
  const resetPassword = createAsyncThunk<Payload, { token: string; newPassword: string }, { rejectValue: AuthError }>(
    'auth/password/reset',
    async ({ token, newPassword }, thunkApi) => {
      try {
        const response = await api.resetPassword(token, newPassword);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: (response.data?.message as string) ?? 'Could not reset password',
            data: response.data,
          });
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: 'No reset password response data',
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
    resetPassword,
  };
};
export default createResetPasswordThunks;
