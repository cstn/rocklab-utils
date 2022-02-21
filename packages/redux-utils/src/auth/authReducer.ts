import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { AuthAPI } from './types';

const createAuthReducer = (api: AuthAPI) => {
  const { reducer: sessionReducer } = sessionSlice('session', api);

  const authReducer = combineReducers({
    session: sessionReducer,
  });

  return { authReducer };
};

export default createAuthReducer;
