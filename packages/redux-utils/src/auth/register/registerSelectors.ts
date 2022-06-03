import { createSelector } from 'reselect';
import { RootState } from '../types';
import { RegisterState } from './types';
import selectAuth from '../authSelectors';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

const selectSelf: <S extends RootState>(state: S) => RegisterState = createSelector(
  selectAuth,
  (state) => state.register
);

const selectRegisterStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: RegisterState) => state.status
);

const selectRegisterError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: RegisterState) => state.error
);

const selectRegisteredUsername: <S extends RootState>(state: S) => string | undefined = createSelector(
  selectSelf,
  (state: RegisterState) => state.username
);

const selectRegisteredEmail: <S extends RootState>(state: S) => string | undefined = createSelector(
  selectSelf,
  (state: RegisterState) => state.email
);

export { selectRegisterStatus, selectRegisterError, selectRegisteredUsername, selectRegisteredEmail };
