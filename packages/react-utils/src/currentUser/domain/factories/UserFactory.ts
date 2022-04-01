import User from '../models/User';

const createUser = ({ username, email }: { username?: string; email: string }): User => {
  if (!username?.length && !email.length) {
    throw new Error('Could not create user with empty username and email');
  }

  if (!email.length) {
    throw new Error('Could not create user with empty email');
  }

  return {
    id: 0,
    username,
    email,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { createUser };
