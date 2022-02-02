import React, { FC } from 'react';
import { screen } from '@testing-library/react';
import renderWithCurrentUser from './utils';
import { useCurrentUser, User, UserProfile, withCurrentUser } from '../index';

describe('currentUser', () => {
  describe('hook', () => {
    const TestComponent = () => {
      const { currentUser, currentUserProfile } = useCurrentUser();

      return (
        <div>
          <dl>
            <dt>User</dt>
            <dd title="userid">{currentUser?.id}</dd>
            <dt>Username</dt>
            <dd title="username">{currentUser?.username}</dd>
            <dt>Email</dt>
            <dd title="email">{currentUser?.email}</dd>
          </dl>
          <dl>
            <dt>Profile</dt>
            <dd title="profileid">{currentUserProfile?.id}</dd>
            <dt>Username</dt>
            <dd title="firstName">{currentUserProfile?.firstName}</dd>
            <dt>Email</dt>
            <dd title="lastName">{currentUserProfile?.lastName}</dd>
          </dl>
        </div>
      );
    };

    it('should render with current user', () => {
      const id = 1;
      const username = 'test';
      const email = 'mail@test.local';

      renderWithCurrentUser(<TestComponent />, {
        user: new User({
          id,
          username,
          email,
        }),
        profile: undefined,
      });

      expect(screen.getByTitle('userid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('username').innerHTML).toEqual(username);
      expect(screen.getByTitle('email').innerHTML).toEqual(email);
    });

    it('should render with current user profile', () => {
      const id = 1;
      const firstName = 'Tom';
      const lastName = 'Test';

      renderWithCurrentUser(<TestComponent />, {
        user: undefined,
        profile: new UserProfile({
          id,
          firstName,
          lastName,
        }),
      });

      expect(screen.getByTitle('profileid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('firstName').innerHTML).toEqual(firstName);
      expect(screen.getByTitle('lastName').innerHTML).toEqual(lastName);
    });
  });

  describe('hoc', () => {
    const Component: FC<{ currentUser: User; currentUserProfile: UserProfile }> = ({
      currentUser,
      currentUserProfile,
    }) => (
      <div>
        <dl>
          <dt>User</dt>
          <dd title="userid">{currentUser?.id}</dd>
          <dt>Username</dt>
          <dd title="username">{currentUser?.username}</dd>
          <dt>Email</dt>
          <dd title="email">{currentUser?.email}</dd>
        </dl>
        <dl>
          <dt>Profile</dt>
          <dd title="profileid">{currentUserProfile?.id}</dd>
          <dt>Username</dt>
          <dd title="firstName">{currentUserProfile?.firstName}</dd>
          <dt>Email</dt>
          <dd title="lastName">{currentUserProfile?.lastName}</dd>
        </dl>
      </div>
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const TestComponent = withCurrentUser(Component);

    it('should render with current user', () => {
      const id = 1;
      const username = 'test';
      const email = 'mail@test.local';

      renderWithCurrentUser(<TestComponent />, {
        user: new User({
          id,
          username,
          email,
        }),
        profile: undefined,
      });

      expect(screen.getByTitle('userid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('username').innerHTML).toEqual(username);
      expect(screen.getByTitle('email').innerHTML).toEqual(email);
    });

    it('should render with current user profile', () => {
      const id = 1;
      const firstName = 'Tom';
      const lastName = 'Test';

      renderWithCurrentUser(<TestComponent />, {
        user: undefined,
        profile: new UserProfile({
          id,
          firstName,
          lastName,
        }),
      });

      expect(screen.getByTitle('profileid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('firstName').innerHTML).toEqual(firstName);
      expect(screen.getByTitle('lastName').innerHTML).toEqual(lastName);
    });
  });
});
