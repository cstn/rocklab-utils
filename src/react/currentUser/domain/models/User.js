/**
 * @fileOverview user model
 */

class User {
  /**
   * constructor
   * @param {number} id       the user ud
   * @param {String} username the username
   * @param {String} email    the email address
   */
  constructor({ id = 0, username, email } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  toString() {
    return `User(${this.username})`;
  }

  toObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }
}

export default User;
