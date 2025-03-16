import { Work } from './work';
import { User } from '../user/user';
import { Review } from './review';
import { Payment } from './payment';
import { Appointment } from '../appointment';

import { BusinessImage } from './business-image';
import { BusinessProfile } from './business-profile';
import { BusinessService } from './business-service';
import { Availability } from './business-availability';
import { BusinessCategory } from './business-category';

export class Business {
  public id: string | undefined;
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
  public services?: BusinessService[];
  public appointments?: Appointment[];
  public works?: Work[];
  public businessProfile?: BusinessProfile;
  public categories?: BusinessCategory[];
  public availability?: Availability[];
  public images?: BusinessImage[];
  public payments?: Payment[];
  public reviews?: Review[];

  constructor(init: {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    imgProfile?: string | null;
    isDisabled?: boolean | null;
    isDeleted?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    user?: User;
    userId?: string;
    services?: BusinessService[];
    appointments?: Appointment[];
    works?: Work[];
    businessProfile?: BusinessProfile;
    categories?: BusinessCategory[];
    availability?: Availability[];
    images?: BusinessImage[];
    payments?: Payment[];
    reviews?: Review[];
  }) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description ?? undefined;
    this.address = init.address ?? undefined;
    this.latitude = init.latitude ?? 0;
    this.longitude = init.longitude ?? 0;
    this.phone = init.phone ?? undefined;
    this.imgProfile = init.imgProfile ?? undefined;
    this.isDisabled = init.isDisabled ?? false;
    this.isDeleted = init.isDeleted ?? false;
    this.createdAt = init.createdAt ?? new Date();
    this.updatedAt = init.updatedAt ?? new Date();

    this.user = init.user;
    this.userId = init.userId;
    this.services = init.services;
    this.appointments = init.appointments;
    this.works = init.works;
    this.businessProfile = init.businessProfile;
    this.categories = init.categories;
    this.availability = init.availability;
    this.images = init.images;
    this.payments = init.payments;
    this.reviews = init.reviews;
  }

  update(partial: Partial<Business>) {
    delete partial.id;
    delete partial.userId;
    delete partial.createdAt;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
