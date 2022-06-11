import { createUserProfile } from './UserProfileFactory';
import { Gender } from '../models/UserProfile';

describe('UserProfileFactory', () => {
  describe('createUserProfile', () => {
    it('should create an user', () => {
      const data = {
        firstName: 'Tom',
        lastName: 'Test',
        gender: 'male' as Gender,
      };
      const user = createUserProfile(data);

      expect(user.firstName).toEqual(data.firstName);
      expect(user.lastName).toEqual(data.lastName);
      expect(user.id).toBeDefined();
    });

    it('should not allow an empty name', () => {
      const data = {
        firstName: '',
        lastName: '',
        gender: 'male' as Gender,
      };

      expect(() => createUserProfile(data)).toThrow('Could not create a user without first name or last name');
    });
  });
});
