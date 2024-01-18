/**
 * @fileOverview user context
 */

import { createContext } from 'react';

import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';

type ContextType = {
  user?: User;
  profile?: UserProfile;
  setUser: (user: User) => void;
  setProfile: (profile: UserProfile) => void;
};

const initialContext: ContextType = {
  user: undefined,
  profile: undefined,
  setUser: () => {},
  setProfile: () => {},
};

export default createContext(initialContext);
export { ContextType };
