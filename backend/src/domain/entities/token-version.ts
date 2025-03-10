import { User } from './user/user';

export class TokenVersion {
  public id: string;
  public version: number;
  public updatedAt: Date;
  public userId: string;
  public user: User;

  /**
   * Updates the token version with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - userId
   *                    - updatedAt
   */
  update(partial: Partial<TokenVersion>) {
    delete partial.id;
    delete partial.userId;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
