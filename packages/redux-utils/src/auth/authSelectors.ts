import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const selectSelf = (state: RootState) => state.auth;

const selectSession = createSelector(selectSelf, (state) => state.session);
const selectRegister = createSelector(selectSelf, (state) => state.register);
const selectConfirm = createSelector(selectSelf, (state) => state.confirm);
const selectChangePassword = createSelector(selectSelf, (state) => state.changePassword);
const selectRequestPassword = createSelector(selectSelf, (state) => state.requestPassword);
const selectResetPassword = createSelector(selectSelf, (state) => state.resetPassword);

export default selectSelf;
export {
  selectChangePassword,
  selectConfirm,
  selectRegister,
  selectRequestPassword,
  selectSession,
  selectResetPassword,
};
