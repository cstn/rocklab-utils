import UserProfile from '../models/UserProfile';

const initials = (profile: UserProfile) => [profile.firstName[0], profile.lastName[0]].filter(Boolean).join('');

const fullName = (profile: UserProfile) => [profile.firstName, profile.lastName].filter(Boolean).join(' ');

export { initials, fullName };
