import { BusinessCategory, BusinessImage, Service } from '@prisma/client';
import { User } from './user.entity';
import { Appointment } from './appointment.entity';
import { Work } from './work.entity';
import { Availability } from './availability.entity';
import { Payment } from './payment.entity';
import { Review } from './review.entity';

export class Business {
  constructor(
    public readonly id: string,
    public name: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public user: User,
    public userId: string,
    public services: Service[],
    public appointments: Appointment[],
    public works: Work[],
    public categories: BusinessCategory[],
    public availability: Availability[],
    public images: BusinessImage[],
    public payments: Payment[],
    public reviews: Review[],
    public description?: string,
    public address?: string,
    public latitude?: number,
    public longitude?: number,
    public phone?: string,
    public imgProfile?: string,
  ) {}
}
