/**
 * @fileOverview User profile model
 */

type Gender = 'male' | 'female' | 'diverse';

type UserProfile = {
  id: number;

  salutation?: string;

  firstName: string;

  lastName: string;

  gender?: Gender;

  pronouns?: string;
};

export default UserProfile;
