/**
 * @fileOverview user model
 */

class User {
  public id: number;

  public username: string;

  public email: string;

  constructor({ id = 0, username, email }: { id: number; username: string; email: string }) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  toString(): string {
    return `User(${this.username})`;
  }

  toJSON(): object {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }
}

export default User;
