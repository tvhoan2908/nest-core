import { RolePermission } from "../../../../databases/entities/acl/role_permission";
import { User } from "../../../../databases/entities/users/user.entity";
import { LoginRequest } from "../../requests/login.request";

export interface AuthService {
  generateToken(userId: number): string;
  findById(userId: number): Promise<User>;
  getPermissionsByRolesId(rolesId: number[]): Promise<RolePermission[]>;
  login(request: LoginRequest): Promise<string>;
}

export const AuthService = Symbol("AuthService");
