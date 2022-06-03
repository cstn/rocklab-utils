import { createSelector } from 'reselect';
import { ChangePasswordState } from './types';
import { RootState } from '../types';
import selectAuth from '../authSelectors';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

const selectSelf: <S extends RootState>(state: S) => ChangePasswordState = createSelector(
  selectAuth,
  (state) => state.changePassword
);

const selectChangePasswordStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: ChangePasswordState) => state.status
);

const selectChangePasswordError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: ChangePasswordState) => state.error
);

export { selectChangePasswordStatus, selectChangePasswordError };
