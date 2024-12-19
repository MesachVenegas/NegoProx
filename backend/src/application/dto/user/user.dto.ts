import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserRegisteredDTO {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() name: string;
  @Expose() last_name: string;
  @Expose() phone: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
