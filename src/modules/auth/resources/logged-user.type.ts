import { EAccountType } from "../../users/constant/user.enum";

export interface ILoggedInUser {
  userId: number;
  permissions: string[];
  fullName: string;
  username: string;
  accountType: EAccountType;
}
