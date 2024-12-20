import { Work } from './work.entity';
import { Date } from './date.entity';
import { Review } from './review.entity';
import { Service } from './service.entity';
import { Conversation } from './conversation.entity';

export class Business {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public address: string,
    public phone: string,
    public email: string,
    public latitude: number,
    public longitude: number,
    public business_img: string | null,
    public user_id: string,
    public isPendingDeletion: boolean,
    public deletionDateLine: Date | null,
    public createdAt: Date,
    public updatedAt: Date,

    public services?: Service[],
    public dates?: Date[],
    public works?: Work[],
    public reviews?: Review[],
    public conversations?: Conversation[],
  ) {}
}
