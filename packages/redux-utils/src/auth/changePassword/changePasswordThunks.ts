import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, AuthOptions, Payload, AuthError } from '../types';

const defaultTransformError = () => ({ message: 'Change password error' });

const createChangePasswordThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const changePassword = createAsyncThunk<
    Payload,
    { oldPassword: string; newPassword: string },
    { rejectValue: AuthError }
  >('auth/password/change', async ({ oldPassword, newPassword }, thunkApi) => {
    try {
      const response = await api.changePassword(oldPassword, newPassword);

      if (response.status >= 400) {
        return thunkApi.rejectWithValue(transformError(response));
      }
      if (response.status !== 204 && !response.data) {
        return thunkApi.rejectWithValue({
          message: 'No change password response data',
          status: response.status,
          statusText: response.statusText,
        });
      }

      return response.data || {};
    } catch (ex) {
      return thunkApi.rejectWithValue(transformError(ex));
    }
  });

  return {
    changePassword,
  };
};
export default createChangePasswordThunks;
