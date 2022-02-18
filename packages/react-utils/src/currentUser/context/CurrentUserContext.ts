/**
 * @fileOverview user context
 */

import { createContext } from 'react';

import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';

type ContextType = {
  user?: User;
  profile?: UserProfile;
};

const initialContext: ContextType = {
  user: undefined,
  profile: undefined,
};

export default createContext(initialContext);
export { ContextType };
