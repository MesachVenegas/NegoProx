import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Hash a password using bcrypt. This function is synchronous.
 * @param {string} plainPass - The password to hash.
 * @returns {string} The hashed password.
 */
export const HashPassword = (plainPass: string): string => {
  return bcrypt.hashSync(plainPass, saltRounds);
};

/**
 * Validate a password against a hashed password using bcrypt. This function is synchronous.
 * @param {string} pass - The plain text password to validate.
 * @param {string} hash - The hashed password to compare against.
 * @returns {boolean} True if the password matches the hash, false otherwise.
 */
export const ValidatePassword = (pass: string, hash: string): boolean => {
  return bcrypt.compareSync(pass, hash);
};
