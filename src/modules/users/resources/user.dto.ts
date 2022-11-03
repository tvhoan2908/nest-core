import { EUserStatus } from "../constant/user.enum";

export interface IUserDto {
  id: number;
  username: string;
  email: string;
  fullName: string;
  status: EUserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  roles: string[];
}
