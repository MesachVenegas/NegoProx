import { User } from '../user/user.entity';

export class Business {
  public id: string;
  public name: string;
  public description: string;
  public address: string;
  public latitude: number;
  public longitude: number;
  public phone: string;
  public imgProfile: string;
  public createdAt: Date;
  public updatedAt: Date;
  public user?: User | null;
  public userId?: string | null;
}
