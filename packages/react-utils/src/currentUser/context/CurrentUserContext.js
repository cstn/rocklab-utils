/**
 * @fileOverview user context
 */

import { createContext } from 'react';
import PropTypes from 'prop-types';

import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';

const initialContext = {
  user: {},
  profile: {},
};

const contextProps = {
  profile: PropTypes.instanceOf(UserProfile),
  user: PropTypes.instanceOf(User),
};

export default createContext(initialContext);
export { contextProps };
