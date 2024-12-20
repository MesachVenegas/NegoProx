export class Review {
  constructor(
    public id: string,
    public rate: number,
    public comment: string,
    public client_id: string,
    public business_id: string,
    public work_id: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
