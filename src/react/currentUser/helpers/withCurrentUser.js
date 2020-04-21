/**
 * @fileOverview high order component for current user
 */

import React from 'react';

import getDisplayName from '../../helper/getDisplayName';
import CurrentUserContext, { contextProps } from '../context/CurrentUserContext';

function withCurrentUser(WrappedComponent) {
  const WithCurrentUser = passThroughProps => (
    <CurrentUserContext.Consumer>
      {currentUser => <WrappedComponent {...passThroughProps} currentUser={currentUser} />}
    </CurrentUserContext.Consumer>
  );

  WithCurrentUser.displayName = `WithCurrentUser(${getDisplayName(WrappedComponent)})`;
  WithCurrentUser.propTypes = contextProps;

  return WithCurrentUser;
}

export default withCurrentUser;
