import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createChangePasswordThunks = (api: AuthAPI) => {
  const changePassword = createAsyncThunk<
    Payload,
    { oldPassword: string; newPassword: string },
    { rejectValue: AuthError }
  >('auth/password/change', async ({ oldPassword, newPassword }, thunkApi) => {
    try {
      const response = await api.changePassword(oldPassword, newPassword);

      if (response.status >= 400) {
        return thunkApi.rejectWithValue({
          status: response.status,
          message: (response.data?.message as string) ?? 'Could not change the password',
          data: response.data,
        });
      }
      if (response.status !== 204 && !response.data) {
        return thunkApi.rejectWithValue({
          status: 500,
          message: 'No change password response data',
        });
      }

      return response.data || {};
    } catch (ex) {
      return thunkApi.rejectWithValue({
        status: 500,
        message: getErrorMessage(ex),
      });
    }
  });

  return {
    changePassword,
  };
};
export default createChangePasswordThunks;
