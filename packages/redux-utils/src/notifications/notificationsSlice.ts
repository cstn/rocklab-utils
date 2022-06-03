import { createSlice } from '@reduxjs/toolkit';
import initialState from './notificationsState';
import { clear, addWarning, addInfo, addMessage, addSuccess, addError, read, remove } from './notificationsReducers';

const reducers = {
  clear,
  addWarning,
  addInfo,
  addMessage,
  addSuccess,
  addError,
  read,
  remove,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers,
});

const { actions, reducer } = messagesSlice;

export default reducer;
export { actions };
