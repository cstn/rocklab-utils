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
};

const CurrentUserProvider: FC<Props> = ({ children, profile, user }): JSX.Element => {
  const value = useMemo(() => ({ user, profile }), [user, profile]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
