import UserProfile from '../models/UserProfile';
import User from '../models/User';

const DEFAULT_INITIALS = 'NN';

const initials = (profile?: UserProfile, user?: User): string => {
  if (!profile && !user) {
    return DEFAULT_INITIALS;
  }

  const userInitials = user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || DEFAULT_INITIALS;
  if (!profile) {
    return userInitials;
  }

  const profileInitials = [profile.firstName[0], profile.lastName[0]].filter(Boolean).join('').toUpperCase();

  return profileInitials.length ? profileInitials : userInitials;
};

const fullName = (profile: UserProfile) => [profile.firstName, profile.lastName].filter(Boolean).join(' ');

export { initials, fullName };
