import { fullName, initials } from './UserService';
import User from '../models/User';
import UserProfile from '../models/UserProfile';

describe('UserService', () => {
  describe('initials', () => {
    it.each`
      profile                                   | user                                         | expected
      ${undefined}                              | ${undefined}                                 | ${'NN'}
      ${undefined}                              | ${{ username: 'abc' }}                       | ${'A'}
      ${undefined}                              | ${{ email: 'tom@test.de' }}                  | ${'T'}
      ${undefined}                              | ${{ username: 'abc', email: 'tom@test.de' }} | ${'A'}
      ${undefined}                              | ${{ username: '', email: 'tom@test.de' }}    | ${'T'}
      ${undefined}                              | ${{ username: '', email: '' }}               | ${'NN'}
      ${{ firstName: 'tom', lastName: 'test' }} | ${{ username: '', email: '' }}               | ${'TT'}
      ${{ firstName: '', lastName: '' }}        | ${{ username: '', email: '' }}               | ${'NN'}
      ${{ firstName: '', lastName: '' }}        | ${{ username: 'abc', email: 'tom@test.de' }} | ${'A'}
    `('should return initials: $expected', ({ profile, user, expected }) => {
      expect(initials(profile as UserProfile, user as User)).toEqual(expected);
    });
  });

  describe('fullName', () => {
    it.each`
      firstName | lastName  | expected
      ${'Tom'}  | ${'Test'} | ${'Tom Test'}
      ${''}     | ${'Test'} | ${'Test'}
      ${'Tom'}  | ${''}     | ${'Tom'}
    `(
      'should return the full name of "$firstName $lastName"',
      ({ firstName, lastName, expected }: { firstName: string; lastName: string; expected: string }) => {
        expect(fullName({ firstName, lastName } as UserProfile)).toEqual(expected);
      }
    );
  });
});
