import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI, Credentials, Payload, AuthOptions, AuthError } from '../types';

const defaultTransformError = () => ({ message: 'Session error' });

const createSessionThunks = (api: AuthAPI, options?: AuthOptions) => {
  const transformError = options?.transformError ?? defaultTransformError;

  const loginUser = createAsyncThunk<Payload, Credentials, { rejectValue: AuthError }>(
    'auth/session/login',
    async (credentials: Credentials, thunkApi) => {
      try {
        const response = await api.login(credentials);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({
            message: 'No login response data',
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response.data;
      } catch (ex) {
        return thunkApi.rejectWithValue(transformError(ex));
      }
    }
  );

  const logoutUser = createAsyncThunk<Payload, undefined, { rejectValue: AuthError }>(
    'auth/session/logout',
    async (_, thunkApi) => {
      try {
        const response = await api.logout();

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }

        return response.data || {};
      } catch (ex) {
        return thunkApi.rejectWithValue(transformError(ex));
      }
    }
  );

  const sessionUser = createAsyncThunk<Payload, string, { rejectValue: AuthError }>(
    'auth/session/check',
    async (token: string, thunkApi) => {
      try {
        const response = await api.session(token);

        if (response.status >= 400) {
          return thunkApi.rejectWithValue(transformError(response));
        }
        if (!response.data) {
          return thunkApi.rejectWithValue({
            message: 'No session response data',
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response.data;
      } catch (ex) {
        return thunkApi.rejectWithValue(transformError(ex));
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
