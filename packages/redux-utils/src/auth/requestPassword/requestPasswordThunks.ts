import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createRequestPasswordThunks = (api: AuthAPI) => {
  const requestPassword = createAsyncThunk<Payload, { email: string }, { rejectValue: AuthError }>(
    'auth/password/request',
    async ({ email }, thunkApi) => {
      try {
        const response = await api.requestPassword(email);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: (response.data?.message as string) ?? 'Could not request a password',
            data: response.data,
          });
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: 'No request password response data',
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
    requestPassword,
  };
};
export default createRequestPasswordThunks;
