/**
 * @fileOverview high order component for current user
 */

import React, { ComponentType } from 'react';

import CurrentUserContext from '../context/CurrentUserContext';

function withCurrentUser<T>(WrappedComponent: ComponentType<T>) {
  const WithCurrentUser = (
    passThroughProps: Omit<T, 'currentUser' | 'currentUserProfile' | 'setCurrentUser' | 'setCurrentUserprofile'>
  ) => (
    <CurrentUserContext.Consumer>
      {({ user, profile, setUser, setProfile }) => (
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(passThroughProps as T)}
          currentUser={user}
          currentUserProfile={profile}
          setCurrentUser={setUser}
          setCurrentUserProfile={setProfile}
        />
      )}
    </CurrentUserContext.Consumer>
  );

  WithCurrentUser.displayName = `WithCurrentUser(${WrappedComponent.displayName || 'Component'})`;

  return WithCurrentUser;
}

export default withCurrentUser;
