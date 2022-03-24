import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Payload } from '../types';

const createRequestPasswordThunks = (api: AuthAPI) => {
  const requestPassword = createAsyncThunk<Payload, { email: string }, { rejectValue: Error }>(
    'auth/password/request',
    async ({ email }, thunkApi) => {
      try {
        const response = await api.requestPassword(email);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({ message: 'No request password response data' });
        }

        return response.data;
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
