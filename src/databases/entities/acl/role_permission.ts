import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CoreEntity } from "../core/core.entity";
import { Permission } from "./permission";
import { Role } from "./role";

@Entity("role_permission")
export class RolePermission extends CoreEntity {
  @Column({ name: "role_id" })
  roleId!: number;

  @Column({ name: "permission_id" })
  permissionId!: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn({ name: "permission_id" })
  permission: Permission;
}
