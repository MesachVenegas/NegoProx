export class Account {
  constructor(
    public id: string,
    public provider: string,
    public provider_id: string,
    public user_id: string,
    public access_token: string,
    public refresh_token: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
