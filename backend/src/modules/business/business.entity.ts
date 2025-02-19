import { Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

import { User } from '../user/user.entity';

export class Business {
  public id: string;
  public name: string;
  public description?: string;
  public address?: string;
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  public latitude?: number;
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  public longitude?: number;
  public phone?: string;
  public imgProfile?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public user?: User | undefined;
  public userId?: string | undefined;
}
