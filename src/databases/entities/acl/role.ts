import { Column, Entity, OneToMany } from "typeorm";
import { CoreEntity } from "../core/core.entity";
import { RolePermission } from "./role_permission";

@Entity("roles")
export class Role extends CoreEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
