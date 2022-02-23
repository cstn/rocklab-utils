import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Response } from '../types';

const createResetPasswordThunks = (api: AuthAPI) => {
  const resetPassword = createAsyncThunk<Response, { token: string; newPassword: string }, { rejectValue: Error }>(
    'auth/password/reset',
    async ({ token, newPassword }, thunkApi) => {
      try {
        const response = await api.resetPassword(token, newPassword);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
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
