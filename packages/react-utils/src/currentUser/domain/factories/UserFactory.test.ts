import { createUser } from './UserFactory';

describe('UserFactory', () => {
  describe('createUser', () => {
    it('should create an user', () => {
      const data = {
        username: 'username',
        email: 'email',
      };
      const user = createUser(data);

      expect(user.username).toEqual(data.username);
      expect(user.email).toEqual(data.email);
      expect(user.id).toBeDefined();
    });

    it('should not allow an empty email', () => {
      const data = {
        username: 'username',
        email: '',
      };

      expect(() => createUser(data)).toThrow('Could not create user with empty email');
    });
  });
});
