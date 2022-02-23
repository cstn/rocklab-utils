import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { RegisterState } from './types';

const selectSelf = (state: RootState) => state.auth.register;

const selectStatus = createSelector(selectSelf, (state: RegisterState) => state.status);
const selectError = createSelector(selectSelf, (state: RegisterState) => state.error);
const selectUsername = createSelector(selectSelf, (state: RegisterState) => state.username);
const selectEmail = createSelector(selectSelf, (state: RegisterState) => state.email);

export { selectStatus, selectError, selectUsername, selectEmail };
