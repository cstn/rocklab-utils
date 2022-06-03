import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createConfirmAccountThunks = (api: AuthAPI) => {
  const confirmAccount = createAsyncThunk<Payload, { userId: string; token: string }, { rejectValue: AuthError }>(
    'auth/account/confirm',
    async ({ userId, token }, thunkApi) => {
      try {
        const response = await api.confirmAccount(userId, token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: (response.data?.message as string) ?? 'Could not confirm account',
            data: response.data,
          });
        }
        if (response.status !== 204 && !response.data) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: 'No account confirmation response data',
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
    confirmAccount,
  };
};
export default createConfirmAccountThunks;
