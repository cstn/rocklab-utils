import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Payload } from '../types';

const createResetPasswordThunks = (api: AuthAPI) => {
  const resetPassword = createAsyncThunk<Payload, { token: string; newPassword: string }, { rejectValue: Error }>(
    'auth/password/reset',
    async ({ token, newPassword }, thunkApi) => {
      try {
        const response = await api.resetPassword(token, newPassword);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({ message: 'No reset password response data' });
        }

        return response.data || {};
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not reset the password' });
      }
    }
  );

  return {
    resetPassword,
  };
};
export default createResetPasswordThunks;
