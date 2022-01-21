/**
 * @fileOverview high order component for current user
 */

import React from 'react';

import getDisplayName from '../../utils/getDisplayName';
import CurrentUserContext, { contextProps } from '../context/CurrentUserContext';

function withCurrentUser(WrappedComponent) {
  function WithCurrentUser(passThroughProps) {
    return (
      <CurrentUserContext.Consumer>
        {({ user, profile }) => (
          <WrappedComponent {...passThroughProps} currentUser={user} currentUserProfile={profile} />
        )}
      </CurrentUserContext.Consumer>
    );
  }

  WithCurrentUser.displayName = `WithCurrentUser(${getDisplayName(WrappedComponent)})`;
  WithCurrentUser.propTypes = contextProps;

  return WithCurrentUser;
}

export default withCurrentUser;
