import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Hashes a plain password using the bcrypt library.
 * @param plainPassword The plain password to hash
 * @returns The hashed password
 */
export const hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};

/**
 * Compares a plain password with a hashed password.
 * @param plainPassword The plain password to compare
 * @param hash The hashed password to compare against
 * @returns true if the plain password matches the hashed password, false otherwise
 */
export const comparePassword = (plainPassword: string, hash: string) => {
  return bcrypt.compareSync(plainPassword, hash);
};
