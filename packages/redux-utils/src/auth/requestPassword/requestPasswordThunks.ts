import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Response } from '../types';

const createRequestPasswordThunks = (api: AuthAPI) => {
  const requestPassword = createAsyncThunk<Response, { email: string }, { rejectValue: Error }>(
    'auth/password/request',
    async ({ email }, thunkApi) => {
      try {
        const response = await api.requestPassword(email);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not request a new password' });
      }
    }
  );

  return {
    requestPassword,
  };
};
export default createRequestPasswordThunks;
