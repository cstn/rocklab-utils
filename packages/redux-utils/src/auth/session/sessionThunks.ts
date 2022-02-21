import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Credentials, Error, Response } from '../types';

const createSessionThunks = (api: AuthAPI) => {
  const loginUser = createAsyncThunk<Response, Credentials, { rejectValue: Error }>(
    'auth/session/login',
    async (credentials: Credentials, thunkApi) => {
      try {
        const response = await api.login(credentials);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not login' });
      }
    }
  );

  const logoutUser = createAsyncThunk<Response, string, { rejectValue: Error }>(
    'auth/session/logout',
    async (token: string, thunkApi) => {
      try {
        const response = await api.logout();

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
      } catch (ex) {
        return thunkApi.rejectWithValue({ message: 'Could not logout' });
      }
    }
  );

  const sessionUser = createAsyncThunk<Response, string, { rejectValue: Error }>(
    'auth/session/check',
    async (token: string, thunkApi) => {
      try {
        const response = await api.session(token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(response.error as Error);
        }

        return response;
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
