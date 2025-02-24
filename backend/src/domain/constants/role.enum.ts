export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS',
}

export type TRole = keyof typeof Role;
