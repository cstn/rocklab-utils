import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Response, AccountConfirmation } from '../types';

const createConfirmAccountThunks = (api: AuthAPI) => {
  const confirmAccount = createAsyncThunk<Response, AccountConfirmation, { rejectValue: Error }>(
    'auth/account/confirm',
    async (confirm: AccountConfirmation, thunkApi) => {
      try {
        const response = await api.confirmAccount(confirm);

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
