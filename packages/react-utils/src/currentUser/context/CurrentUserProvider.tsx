/**
 * @fileOverview provider for current user
 */

import React, { FC, useMemo } from 'react';
import User from '../domain/models/User';
import UserProfile from '../domain/models/UserProfile';
import CurrentUserContext from './CurrentUserContext';

type Props = {
  profile: UserProfile | undefined;
  user: User | undefined;
  setUser: (user: User) => void;
  setProfile: (profile: UserProfile) => void;
};

const CurrentUserProvider: FC<Props> = ({ children, profile, user, setUser, setProfile }) => {
  const value = useMemo(() => ({ user, profile, setUser, setProfile }), [user, profile, setUser, setProfile]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
