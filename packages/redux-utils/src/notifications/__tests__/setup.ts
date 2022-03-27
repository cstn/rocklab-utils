import { configureStore, Store } from '@reduxjs/toolkit';
import { NotificationsState } from '../types';
import { notificationsReducer } from '../index';

type Options = {
  initialState?: NotificationsState;
};

const setup = ({ initialState }: Options = {}): Store =>
  configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    ...(initialState
      ? {
          preloadedState: { notifications: initialState },
        }
      : undefined),
  });

export default setup;
