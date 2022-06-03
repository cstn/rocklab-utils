import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Notification from './domain/models/Notification';
import { hasBeenRead, isNew } from './domain/specifications';
import { NotificationsState, RootState } from './types';

const useTypedNotificationsSelector: TypedUseSelectorHook<RootState> = useSelector;

const selectSelf = <S extends RootState>(state: S): NotificationsState => state.notifications;

const selectNotifications: <S extends RootState>(state: S) => Notification[] = createSelector(
  selectSelf,
  (notifications: NotificationsState) => notifications
);

const selectNewNotifications: <S extends RootState>(state: S) => Notification[] = createSelector(
  selectNotifications,
  (notifications: Notification[]) => notifications.filter((notification) => isNew(notification))
);

const selectNewNotificationsCount: <S extends RootState>(state: S) => number = createSelector(
  selectNewNotifications,
  (notifications) => notifications.length
);

const selectReadNotifications: <S extends RootState>(state: S) => Notification[] = createSelector(
  selectNotifications,
  (notifications) => notifications.filter((notification) => hasBeenRead(notification))
);

export {
  selectNotifications,
  selectNewNotifications,
  selectNewNotificationsCount,
  selectReadNotifications,
  useTypedNotificationsSelector,
};
