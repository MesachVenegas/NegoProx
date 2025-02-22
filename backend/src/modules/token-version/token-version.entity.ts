import { Type } from 'class-transformer';
import { User } from '../user/user.entity';

export class TokenVersion {
  id: string;
  version: number;
  updatedAt: Date;
  userId: string;
  @Type(() => User)
  user: User;

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
