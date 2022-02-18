/**
 * @fileOverview User profile model
 */
class UserProfile {
  public id: number;

  public salutation?: string;

  public firstName: string;

  public lastName: string;

  /**
   * constructor
   */
  constructor({
    id = 0,
    salutation,
    firstName,
    lastName,
  }: {
    id: number;
    salutation?: string;
    firstName: string;
    lastName: string;
  }) {
    this.id = id;
    this.salutation = salutation;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /**
   * get full name
   * @returns {string}
   */
  getName(): string {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }

  /**
   * get initials
   * @returns {string}
   */
  getInitials(): string {
    return [this.firstName, this.lastName]
      .filter((n) => n)
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * string representation
   * @returns {string}
   */
  toString(): string {
    return `UserProfile(${this.lastName}, ${this.firstName})`;
  }

  /**
   * json
   * @returns {{id: number, salutation: string, firstName: string, lastName: string}}
   */
  toObject(): object {
    return {
      id: this.id,
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export default UserProfile;
