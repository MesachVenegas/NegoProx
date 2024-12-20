export enum Role {
  USER = 'USER',
  BUSINESS = 'BUSINESS',
}

export type RoleType = keyof typeof Role;
