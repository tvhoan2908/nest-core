import { EAccountType, EUserStatus } from "../../../modules/users/constant/user.enum";
import { Column, Entity } from "typeorm";
import { CoreEntity } from "../core/core.entity";

@Entity("users")
export class User extends CoreEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column()
  status: EUserStatus = EUserStatus.DISABLED;

  @Column({ name: "account_type" })
  accountType: EAccountType = EAccountType.AUTHENTICATED;

  @Column({ name: "last_login_at" })
  lastLoginAt: Date;

  @Column({ name: "token_expired_at" })
  tokenExpiredAt: Date;
}
