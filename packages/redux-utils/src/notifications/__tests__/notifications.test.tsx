import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import renderWithStore from '../../test/utils';
import {
  Notification,
  selectNewNotificationsCount,
  selectNotifications,
  notificationsActions,
  createInfo,
  createError,
  createWarning,
  createSuccess,
} from '../index';
import setup from './setup';

const Test = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const newNotificationsCount = useSelector(selectNewNotificationsCount);

  const handleRead = (index: number) => () => dispatch(notificationsActions.read({ index }));
  const handleDelete = (index: number) => () => dispatch(notificationsActions.remove({ index }));

  return (
    <div>
      <ul>
        {notifications.map((notification: Notification, index: number) => (
          <li key={notification.message as string}>
            <span>
              {notification.type}: {notification.message} ({notification.details})
            </span>
            <form>
              <button type="button" onClick={handleRead(index)}>
                read
              </button>
              <button type="button" onClick={handleDelete(index)}>
                delete
              </button>
            </form>
          </li>
        ))}
      </ul>
      <div data-testid="new-count">{newNotificationsCount}</div>
      <div data-testid="total-count">{notifications.length}</div>
    </div>
  );
};

describe('Notifications', () => {
  it('should not have any notification by default', () => {
    const store = setup();

    renderWithStore(<Test />, { store });

    expect(screen.getByTestId('new-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-count')).toHaveTextContent('0');
  });

  it('should render notifications', () => {
    const store = setup({
      initialState: [
        createInfo('info message', 'hello'),
        createError('error message', 'failed'),
        createWarning('warning message', 'attention'),
        createSuccess('success message', 'ok'),
      ],
    });

    renderWithStore(<Test />, { store });

    expect(screen.getByTestId('new-count')).toHaveTextContent('4');
    expect(screen.getByTestId('total-count')).toHaveTextContent('4');
    expect(screen.getByText('info: info message (hello)')).toBeInTheDocument();
    expect(screen.getByText('error: error message (failed)')).toBeInTheDocument();
    expect(screen.getByText('warning: warning message (attention)')).toBeInTheDocument();
    expect(screen.getByText('success: success message (ok)')).toBeInTheDocument();
  });

  it('should handle message reading', async () => {
    const store = setup({
      initialState: [createInfo('one'), createInfo('two')],
    });

    renderWithStore(<Test />, { store });

    expect(screen.getByTestId('new-count')).toHaveTextContent('2');
    expect(screen.getByTestId('total-count')).toHaveTextContent('2');

    const readButtons = await screen.findAllByRole('button', { name: 'read' });
    fireEvent.click(readButtons[0]);

    expect(screen.getByTestId('new-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total-count')).toHaveTextContent('2');
  });
});
