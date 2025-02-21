import { Type } from 'class-transformer';

import { User } from '../user/user.entity';

export class Business {
  public id: string;
  public name: string;
  public description?: string;
  public address?: string;
  @Type(() => Number)
  public latitude?: number;
  @Type(() => Number)
  public longitude?: number;
  public phone?: string;
  public imgProfile?: string;
  public createdAt: Date;
  public updatedAt: Date;
  @Type(() => User)
  public user?: User | undefined;
  public userId?: string | undefined;
}
