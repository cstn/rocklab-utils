import UserProfile, { Gender } from '../models/UserProfile';

const createUserProfile = ({
  id,
  userId,
  salutation,
  firstName,
  lastName,
  gender,
  pronouns,
  birthDate,
  phone,
  fax,
  mobile,
}: {
  id?: number;
  userId?: number;
  salutation?: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  pronouns?: string;
  birthDate?: string | Date;
  phone?: string;
  fax?: string;
  mobile?: string;
}): UserProfile => {
  if (!firstName.length || !lastName.length) {
    throw new Error('Could not create a user without first name or last name');
  }

  return {
    id: id || 0,
    userId: userId || 0,
    salutation,
    lastName,
    firstName,
    gender,
    pronouns,
    birthDate: typeof birthDate === 'string' ? new Date(birthDate) : birthDate,
    phone,
    fax,
    mobile,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { createUserProfile };
