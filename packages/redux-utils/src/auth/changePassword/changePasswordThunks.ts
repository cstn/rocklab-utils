import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Error, Response } from '../types';

const createChangePasswordThunks = (api: AuthAPI) => {
  const changePassword = createAsyncThunk<
    Response,
    { oldPassword: string; newPassword: string },
    { rejectValue: Error }
  >('auth/password/change', async ({ oldPassword, newPassword }, thunkApi) => {
    try {
      const response = await api.changePassword(oldPassword, newPassword);

      if (response.status >= 400) {
        return thunkApi.rejectWithValue(response.error as Error);
      }

      return response;
    } catch (ex) {
      return thunkApi.rejectWithValue({ message: 'Could not change the password' });
    }
  });

  return {
    changePassword,
  };
};
export default createChangePasswordThunks;