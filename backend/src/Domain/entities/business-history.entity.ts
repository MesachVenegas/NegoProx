export class BusinessHistory {
  constructor(
    public id: string,
    public owner_id: string,
    public owner_name: string,
    public business_id: string,
    public name: string,
    public deletedAt: Date,
  ) {}
}
