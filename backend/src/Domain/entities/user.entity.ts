import { Role } from '@prisma/client';

export class User {
  constructor(
    public id: string,
    public name: string,
    public last_name: string | null,
    public email: string,
    public email_confirmed: boolean,
    public phone: string | null,
    public password: string | null,
    public user_role: Role,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
