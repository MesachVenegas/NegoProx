export class Service {
  private _id: string;
  private _name: string;
  private _price: number;
  private _duration: number;
  private _business_id: string;
  private _created_at: Date;
  private _updated_at: Date;
  constructor(
    id: string,
    name: string,
    price: number,
    duration: number,
    business_id: string,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._duration = duration;
    this._business_id = business_id;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      duration: this._duration,
      business_id: this._business_id,
      created_at: this._created_at.toISOString(),
      updated_at: this._updated_at.toISOString(),
    };
  }
}
