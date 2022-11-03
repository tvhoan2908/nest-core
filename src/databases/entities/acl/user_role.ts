import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CoreEntity } from "../core/core.entity";
import { User } from "../users/user.entity";
import { Role } from "./role";

@Entity("user_role")
export class UserRole extends CoreEntity {
  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "role_id" })
  roleId!: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;
}
