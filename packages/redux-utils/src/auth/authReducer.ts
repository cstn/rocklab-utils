import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { registerSlice } from './register';
import { confirmAccountSlice } from './confirmAccount';
import { changePasswordSlice } from './changePassword';
import { requestPasswordSlice } from './requestPassword';
import { resetPasswordSlice } from './resetPassword';
import { AuthAPI } from './types';

const createAuthReducer = (api: AuthAPI) => {
  const { reducer: sessionReducer, actions: sessionActions } = sessionSlice('session', api);
  const { reducer: registerReducer, actions: registerActions } = registerSlice('register', api);
  const { reducer: confirmAccountReducer, actions: confirmAccountActions } = confirmAccountSlice(
    'accountConfirmation',
    api
  );
  const { reducer: changePasswordReducer, actions: changePasswordActions } = changePasswordSlice('passwordChange', api);
  const { reducer: requestPasswordReducer, actions: requestPasswordActions } = requestPasswordSlice(
    'passwordRequest',
    api
  );
  const { reducer: resetPasswordReducer, actions: resetPasswordActions } = resetPasswordSlice('passwordReset', api);

  const reducer = combineReducers({
    session: sessionReducer,
    register: registerReducer,
    confirm: confirmAccountReducer,
    changePassword: changePasswordReducer,
    requestPassword: requestPasswordReducer,
    resetPassword: resetPasswordReducer,
  });

  return {
    reducer,
    actions: {
      ...sessionActions,
      ...registerActions,
      ...confirmAccountActions,
      ...changePasswordActions,
      ...requestPasswordActions,
      ...resetPasswordActions,
    },
  };
};

export default createAuthReducer;
