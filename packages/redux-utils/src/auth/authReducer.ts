import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { registerSlice } from './register';
import { confirmAccountSlice } from './confirmAccount';
import { AuthAPI } from './types';

const createAuthReducer = (api: AuthAPI) => {
  const { reducer: sessionReducer } = sessionSlice('session', api);
  const { reducer: registerReducer } = registerSlice('register', api);
  const { reducer: confirmAccountReducer } = confirmAccountSlice('confirm', api);

  const authReducer = combineReducers({
    session: sessionReducer,
    register: registerReducer,
    confirm: confirmAccountReducer,
  });

  return { authReducer };
};

export default createAuthReducer;
