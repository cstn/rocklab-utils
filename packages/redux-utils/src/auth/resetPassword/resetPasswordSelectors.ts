import { createSelector } from 'reselect';
import { RootState } from '../types';
import { ResetPasswordState } from './types';
import selectAuth from '../authSelectors';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

const selectSelf: <S extends RootState>(state: S) => ResetPasswordState = createSelector(
  selectAuth,
  (state) => state.resetPassword
);

const selectResetPasswordStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: ResetPasswordState) => state.status
);

const selectResetPasswordError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: ResetPasswordState) => state.error
);

export { selectResetPasswordStatus, selectResetPasswordError };
