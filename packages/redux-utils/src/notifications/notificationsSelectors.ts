import { createSelector } from 'reselect';
import { RootState } from '../types';
import { hasBeenRead, isNew } from './domain/specifications';

const selectNotifications = (state: RootState) => state.notifications;

const selectNewNotifications = createSelector(selectNotifications, (notifications) =>
  notifications.filter((notification) => isNew(notification))
);

const selectReadNotifications = createSelector(selectNotifications, (notifications) =>
  notifications.filter((notification) => hasBeenRead(notification))
);

export { selectNotifications, selectNewNotifications, selectReadNotifications };
