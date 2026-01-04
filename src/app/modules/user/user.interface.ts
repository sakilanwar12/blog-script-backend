export enum EUserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}
export type TUserRole = `${EUserRole}`;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
