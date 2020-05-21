/**
 * @fileOverview provider for current user
 */

import React from 'react';
import PropTypes from 'prop-types';
import User from '../domain/models/User';
import CurrentUserContext from './CurrentUserContext';

const CurrentUserProvider = ({ children, user }) => (
  <CurrentUserContext.Provider currentUser={user}>{children}</CurrentUserContext.Provider>
);

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.instanceOf(User),
};

export default CurrentUserProvider;
