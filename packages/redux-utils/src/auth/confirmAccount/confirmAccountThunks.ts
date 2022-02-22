import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Response } from '../types';

const createConfirmAccountThunks = (api: AuthAPI) => {
  const confirmAccount = createAsyncThunk<Response, { userId: string; token: string }, { rejectValue: Error }>(
    'auth/account/confirm',
    async ({ userId, token }, thunkApi) => {
      try {
        const response = await api.confirmAccount(userId, token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not confirm the account' });
      }
    }
  );

  return {
    confirmAccount,
  };
};
export default createConfirmAccountThunks;
