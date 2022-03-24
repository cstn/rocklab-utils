import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Payload } from '../types';

const createConfirmAccountThunks = (api: AuthAPI) => {
  const confirmAccount = createAsyncThunk<Payload, { userId: string; token: string }, { rejectValue: Error }>(
    'auth/account/confirm',
    async ({ userId, token }, thunkApi) => {
      try {
        const response = await api.confirmAccount(userId, token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({ message: 'No account confirmation response data' });
        }

        return response.data;
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
