import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { RegisterState } from './types';
import { SessionState } from '../session/types';

const selectSelf = (state: RootState) => state.auth.register;

const selectStatus = createSelector(selectSelf, (state: RegisterState) => state.status);
const selectError = createSelector(selectSelf, (state: RegisterState) => state.error);
const selectUsername = createSelector(selectSelf, (state: RegisterState) => state.username);
const selectEmail = createSelector(selectSelf, (state: RegisterState) => state.email);
const selectErrorMessage = createSelector(
  selectSelf,
  (state: SessionState) => state.error?.message ?? 'Register error'
);

export { selectStatus, selectError, selectUsername, selectEmail, selectErrorMessage };
