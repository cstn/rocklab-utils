/**
 * @fileOverview User profile model
 */
class UserProfile {
  /**
   * constructor
   * @param id
   * @param salutation
   * @param firstName
   * @param lastName
   */
  constructor({ id = 0, salutation, firstName, lastName } = {}) {
    this.id = id;
    this.salutation = salutation;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /**
   * get full name
   * @returns {string}
   */
  getName = () => [this.firstName, this.lastName].join(' ');

  /**
   * get initials
   * @returns {string}
   */
  getInitials() {
    return [this.firstName, this.lastName]
      .filter(n => n)
      .map(n => n.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * string representation
   * @returns {string}
   */
  toString() {
    return `UserProfile(${this.lastName}, ${this.firstName})`;
  }

  /**
   * json
   * @returns {{id: number, salutation: string, firstName: string, lastName: string}}
   */
  toObject() {
    return {
      id: this.id,
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export default UserProfile;
