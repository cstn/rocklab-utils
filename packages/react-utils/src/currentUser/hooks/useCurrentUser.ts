/**
 * @fileOverview hook to access current user
 */

import { useContext } from 'react';
import CurrentUserContext, { ContextType } from '../context/CurrentUserContext';
import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';

type ReturnType = { currentUser: User | undefined; currentUserProfile: UserProfile | undefined };

const useCurrentUser = (): ReturnType => {
  const context: ContextType = useContext(CurrentUserContext);

  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return {
    currentUser: context.user,
    currentUserProfile: context.profile,
  };
};

export default useCurrentUser;
