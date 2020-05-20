/**
 * @fileOverview user context
 */

import { createContext } from 'react';
import PropTypes from 'prop-types';

import User from '../domain/models/User';

const initialContext = {
  id: 0,
  username: null,
};

const contextProps = {
  currentUser: PropTypes.instanceOf(User),
};

export default createContext(initialContext);
export { contextProps };
