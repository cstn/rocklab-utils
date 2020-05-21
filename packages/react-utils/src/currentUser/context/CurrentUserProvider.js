/**
 * @fileOverview provider for current user
 */

import React from 'react';
import PropTypes from 'prop-types';
import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';
import CurrentUserContext from './CurrentUserContext';

const CurrentUserProvider = ({ children, profile, user }) => (
  <CurrentUserContext.Provider value={{ user, profile }}>{children}</CurrentUserContext.Provider>
);

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  profile: PropTypes.instanceOf(UserProfile),
  user: PropTypes.instanceOf(User),
};

export default CurrentUserProvider;
