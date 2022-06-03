import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserProfile } from '@rocklab/react-utils';
import { AuthAPI, Credentials, Payload } from '../types';
import { AuthError } from '../utils/errors';
import getErrorMessage from '../../utils/errors';

const createSessionThunks = (api: AuthAPI) => {
  const loginUser = createAsyncThunk<
    {
      user: User;
      profile: UserProfile;
      access_token: string;
      refresh_token: string;
    },
    Credentials,
    { rejectValue: AuthError }
  >('auth/session/login', async (credentials: Credentials, thunkApi) => {
    try {
      const response = await api.login(credentials);

      if (response.status >= 400) {
        return thunkApi.rejectWithValue({
          status: response.status,
          message: 'Could not login user',
          data: response.data,
        });
      }
      if (!response.data) {
        return thunkApi.rejectWithValue({
          status: response.status,
          message: 'No login response data',
        });
      }

      return response.data;
    } catch (ex) {
      return thunkApi.rejectWithValue({
        status: 500,
        message: getErrorMessage(ex),
      });
    }
  });

  const logoutUser = createAsyncThunk<Payload, undefined, { rejectValue: AuthError }>(
    'auth/session/logout',
    async (_, thunkApi) => {
      try {
        const response = await api.logout();

        if (response.status >= 400) {
          return thunkApi.rejectWithValue({
            status: response.status,
            message: 'Could not logout user',
            data: response.data,
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

  const sessionUser = createAsyncThunk<
    {
      user: User;
      profile: UserProfile;
    },
    string,
    { rejectValue: AuthError }
  >('auth/session/check', async (token: string, thunkApi) => {
    try {
      const response = await api.session(token);

      if (response.status >= 400) {
        return thunkApi.rejectWithValue({
          status: response.status,
          message: 'Could not check session',
          data: response.data,
        });
      }
      if (!response.data) {
        return thunkApi.rejectWithValue({
          status: response.status,
          message: 'No session response data',
        });
      }

      return response.data;
    } catch (ex) {
      return thunkApi.rejectWithValue({
        status: 500,
        message: getErrorMessage(ex),
      });
    }
  });

  return {
    loginUser,
    logoutUser,
    sessionUser,
  };
};
export default createSessionThunks;
