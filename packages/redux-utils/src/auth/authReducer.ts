import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import { registerSlice } from './register';
import { confirmAccountSlice } from './confirmAccount';
import { changePasswordSlice } from './changePassword';
import { requestPasswordSlice } from './requestPassword';
import { resetPasswordSlice } from './resetPassword';
import { AuthAPI, AuthOptions } from './types';

const createAuthReducer = (api: AuthAPI, options?: AuthOptions) => {
  const { reducer: sessionReducer, actions: sessionActions } = sessionSlice('session', api, options);
  const { reducer: registerReducer, actions: registerActions } = registerSlice('register', api, options);
  const { reducer: confirmAccountReducer, actions: confirmAccountActions } = confirmAccountSlice(
    'accountConfirmation',
    api,
    options
  );
  const { reducer: changePasswordReducer, actions: changePasswordActions } = changePasswordSlice(
    'passwordChange',
    api,
    options
  );
  const { reducer: requestPasswordReducer, actions: requestPasswordActions } = requestPasswordSlice(
    'passwordRequest',
    api,
    options
  );
  const { reducer: resetPasswordReducer, actions: resetPasswordActions } = resetPasswordSlice(
    'passwordReset',
    api,
    options
  );

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
