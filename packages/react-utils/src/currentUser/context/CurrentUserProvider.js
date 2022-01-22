/**
 * @fileOverview provider for current user
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';
import CurrentUserContext from './CurrentUserContext';

function CurrentUserProvider({ children, profile, user }) {
  const value = useMemo(() => ({ user, profile }), [user, profile]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  profile: PropTypes.instanceOf(UserProfile),
  user: PropTypes.instanceOf(User),
};

CurrentUserProvider.defaultProps = {
  profile: {},
  user: {},
};

export default CurrentUserProvider;
