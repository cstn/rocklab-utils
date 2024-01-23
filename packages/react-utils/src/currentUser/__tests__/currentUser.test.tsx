import React, { FC, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CurrentUserProvider, useCurrentUser, User, UserProfile, withCurrentUser } from '../index';

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

      render(
        <CurrentUserProvider
          profile={undefined}
          setProfile={() => {}}
          setUser={() => {}}
          user={{
            id,
            username,
            email,
          }}
        >
          <TestComponent />
        </CurrentUserProvider>
      );

      expect(screen.getByTitle('userid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('username').innerHTML).toEqual(username);
      expect(screen.getByTitle('email').innerHTML).toEqual(email);
    });

    it('should render with current user profile', () => {
      const id = 1;
      const userId = 2;
      const firstName = 'Tom';
      const lastName = 'Test';

      render(
        <CurrentUserProvider
          profile={{
            id,
            userId,
            firstName,
            lastName,
          }}
          setProfile={() => {}}
          setUser={() => {}}
          user={undefined}
        >
          <TestComponent />
        </CurrentUserProvider>
      );

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

      render(
        <CurrentUserProvider
          profile={undefined}
          setProfile={() => {}}
          setUser={() => {}}
          user={{
            id,
            username,
            email,
          }}
        >
          <TestComponent />
        </CurrentUserProvider>
      );

      expect(screen.getByTitle('userid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('username').innerHTML).toEqual(username);
      expect(screen.getByTitle('email').innerHTML).toEqual(email);
    });

    it('should render with current user profile', () => {
      const id = 1;
      const userId = 2;
      const firstName = 'Tom';
      const lastName = 'Test';

      render(
        <CurrentUserProvider
          profile={{
            id,
            userId,
            firstName,
            lastName,
          }}
          setProfile={() => {}}
          setUser={() => {}}
          user={undefined}
        >
          <TestComponent />
        </CurrentUserProvider>
      );

      expect(screen.getByTitle('profileid').innerHTML).toEqual(id.toString());
      expect(screen.getByTitle('firstName').innerHTML).toEqual(firstName);
      expect(screen.getByTitle('lastName').innerHTML).toEqual(lastName);
    });

    it('should change the current user', async () => {
      const id = 1;
      const username = 'test';
      const email = 'mail@test.local';
      const email2 = 'mail2@test.local';
      const initialUser = {
        id,
        username,
        email,
      } as User;

      const ComponentWithUser = () => {
        const [user, setUser] = useState(initialUser);

        const handleClick = () => {
          setUser({
            ...initialUser,
            email: email2,
          });
        };

        return (
          <CurrentUserProvider profile={undefined} setProfile={() => {}} setUser={setUser} user={user}>
            <TestComponent />
            <button type="button" onClick={handleClick}>
              changeUser
            </button>
          </CurrentUserProvider>
        );
      };

      render(<ComponentWithUser />);

      expect(screen.getByTitle('email').innerHTML).toEqual(email);
      fireEvent.click(screen.getByText('changeUser'));
      const mailText = await screen.findByText(email2);
      expect(mailText).toBeDefined();
    });
  });
});
