import { createSelector } from 'reselect';
import { ConfirmState } from './types';
import { RootState } from '../types';
import selectAuth from '../authSelectors';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

const selectSelf: <S extends RootState>(state: S) => ConfirmState = createSelector(
  selectAuth,
  (state) => state.confirm
);

const selectConfirmedStatus: <S extends RootState>(state: S) => Status = createSelector(
  selectSelf,
  (state: ConfirmState) => state.status
);

const selectConfirmedError: <S extends RootState>(state: S) => AuthError | undefined = createSelector(
  selectSelf,
  (state: ConfirmState) => state.error
);

const selectConfirmedUserId: <S extends RootState>(state: S) => number | undefined = createSelector(
  selectSelf,
  (state: ConfirmState) => state.userId
);

export { selectConfirmedStatus, selectConfirmedError, selectConfirmedUserId };
