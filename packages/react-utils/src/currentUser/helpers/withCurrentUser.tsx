/**
 * @fileOverview high order component for current user
 */

import React, { ComponentType } from 'react';

import CurrentUserContext from '../context/CurrentUserContext';

function withCurrentUser<T>(WrappedComponent: ComponentType<T>) {
  const WithCurrentUser = (passThroughProps: Omit<T, 'currentUser' | 'currentUserProfile'>): JSX.Element => (
    <CurrentUserContext.Consumer>
      {({ user, profile }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WrappedComponent {...(passThroughProps as T)} currentUser={user} currentUserProfile={profile} />
      )}
    </CurrentUserContext.Consumer>
  );

  WithCurrentUser.displayName = `WithCurrentUser(${WrappedComponent.displayName || 'Component'})`;

  return WithCurrentUser;
}

export default withCurrentUser;
