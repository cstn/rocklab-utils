import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { registerSlice } from './register';
import { AuthAPI } from './types';

const createAuthReducer = (api: AuthAPI) => {
  const { reducer: sessionReducer } = sessionSlice('session', api);
  const { reducer: registerReducer } = registerSlice('register', api);

  const authReducer = combineReducers({
    session: sessionReducer,
    register: registerReducer,
  });

  return { authReducer };
};

export default createAuthReducer;
