export interface UpdateProfile {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface FindQuery {
  id?: string;
  email?: string;
  phone?: string;
}
