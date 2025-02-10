export class Business {
  private _id: string;
  private _name: string;
  private _address: string;
  private _latitude: number;
  private _longitude: number;
  private _userId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    userId: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._latitude = latitude;
    this._longitude = longitude;
    this._userId = userId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public updateBusiness(data: {
    name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  }): void {
    if (data.name) this._name = data.name;
    if (data.address) this._address = data.address;
    if (data.latitude) this._latitude = data.latitude;
    if (data.longitude) this._longitude = data.longitude;
    this._updatedAt = new Date();
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      address: this._address,
      latitude: this._latitude,
      longitude: this._longitude,
      userId: this._userId,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
