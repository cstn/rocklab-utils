/**
 * @fileOverview User profile model
 */

type Gender = 'male' | 'female' | 'diverse';

type Person = {
  salutation?: string;
  firstName: string;
  lastName: string;
  gender?: Gender;
  pronouns?: string;
  birthDate?: Date;
};

type Contact = {
  phone?: string;
  fax?: string;
  mobile?: string;
  email?: string;
};

type UserProfile = {
  id: number;
  userId: number;
} & Person &
  Contact;

export default UserProfile;
export { Gender, Person, Contact };
