import { createSelector } from 'reselect';
import { RootState } from '../types';
import { RequestPasswordState } from './types';
import selectAuth from '../authSelectors';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

const selectSelf: <S extends RootState>(state: S) => RequestPasswordState = createSelector(
  selectAuth,
  (state) => state.requestPassword
);

const selectRequestPasswordStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: RequestPasswordState) => state.status
);

const selectRequestPasswordError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: RequestPasswordState) => state.error
);

const selectRequestPasswordEmail: <S extends RootState>(state: S) => string | undefined = createSelector(
  selectSelf,
  (state: RequestPasswordState) => state.email
);

export { selectRequestPasswordStatus, selectRequestPasswordError, selectRequestPasswordEmail };
