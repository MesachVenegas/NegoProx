import { Type } from 'class-transformer';

import { User } from '../user/user.entity';
import { Service } from '../business-services/business-service.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Work } from '../work/work.entity';
import { BusinessProfile } from '../business-profile/business-profile.entity';
import { BusinessCategory } from '../business-category/business-category.entity';
import { Availability } from '../availability/availability.entity';
import { BusinessImage } from '../business-image/business-image.entity';
import { Payment } from '../payment/payment.entity';
import { Review } from '../review/review.entity';

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
  public user?: User;
  public userId?: string;

  @Type(() => Service)
  services?: Service[];

  @Type(() => Appointment)
  appointments?: Appointment[];

  @Type(() => Work)
  works?: Work[];

  @Type(() => BusinessProfile)
  businessProfile?: BusinessProfile;

  @Type(() => BusinessCategory)
  categories?: BusinessCategory[];

  @Type(() => Availability)
  availability?: Availability[];

  @Type(() => BusinessImage)
  images?: BusinessImage[];

  @Type(() => Payment)
  payments: Payment[];

  @Type(() => Review)
  reviews?: Review[];

  update(partial: Partial<Business>) {
    delete partial.id;
    delete partial.userId;
    delete partial.createdAt;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
