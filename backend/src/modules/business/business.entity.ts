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
  public latitude?: number;
  public longitude?: number;
  public phone?: string;
  public imgProfile?: string;
  public isDisabled?: boolean;
  public isDeleted?: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  public user?: User;
  public userId?: string;
  public services?: Service[];
  public appointments?: Appointment[];
  public works?: Work[];
  public businessProfile?: BusinessProfile;
  public categories?: BusinessCategory[];
  public availability?: Availability[];
  public images?: BusinessImage[];
  public payments: Payment[];
  public reviews?: Review[];

  update(partial: Partial<Business>) {
    delete partial.id;
    delete partial.userId;
    delete partial.createdAt;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
