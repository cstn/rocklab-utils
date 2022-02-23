import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { registerSlice } from './register';
import { confirmAccountSlice } from './confirmAccount';
import { changePasswordSlice } from './changePassword';
import { requestPasswordSlice } from './requestPassword';
import { AuthAPI } from './types';

const createAuthReducer = (api: AuthAPI) => {
  const { reducer: sessionReducer } = sessionSlice('session', api);
  const { reducer: registerReducer } = registerSlice('register', api);
  const { reducer: confirmAccountReducer } = confirmAccountSlice('account/confirm', api);
  const { reducer: changePasswordReducer } = changePasswordSlice('password/change', api);
  const { reducer: requestPasswordReducer } = requestPasswordSlice('password/request', api);

  const authReducer = combineReducers({
    session: sessionReducer,
    register: registerReducer,
    confirm: confirmAccountReducer,
    changePassword: changePasswordReducer,
    requestPassword: requestPasswordReducer,
  });

  return { authReducer };
};

export default createAuthReducer;
