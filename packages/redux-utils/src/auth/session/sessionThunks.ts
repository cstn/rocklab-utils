import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Credentials, Error, Payload } from '../types';

const createSessionThunks = (api: AuthAPI) => {
  const loginUser = createAsyncThunk<Payload, Credentials, { rejectValue: Error }>(
    'auth/session/login',
    async (credentials: Credentials, thunkApi) => {
      try {
        const response = await api.login(credentials);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({ message: 'No login response data' });
        }

        return response.data;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not login' });
      }
    }
  );

  const logoutUser = createAsyncThunk<Payload, undefined, { rejectValue: Error }>(
    'auth/session/logout',
    async (_, thunkApi) => {
      try {
        const response = await api.logout();

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response.data || {};
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not logout' });
      }
    }
  );

  const sessionUser = createAsyncThunk<Payload, string, { rejectValue: Error }>(
    'auth/session/check',
    async (token: string, thunkApi) => {
      try {
        const response = await api.session(token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({ message: 'No session response data' });
        }

        return response.data;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not check user session' });
      }
    }
  );

  return {
    loginUser,
    logoutUser,
    sessionUser,
  };
};
export default createSessionThunks;
