import { RolePermission } from "../../../../databases/entities/acl/role_permission";
import { User } from "../../../../databases/entities/users/user.entity";

export interface AuthService {
  generateToken(userId: number): string;
  findById(userId: number): Promise<User>;
  getPermissionsByRolesId(rolesId: number[]): Promise<RolePermission[]>;
}

export const AuthService = Symbol("AuthService");
