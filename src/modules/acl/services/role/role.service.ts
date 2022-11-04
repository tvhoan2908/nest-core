import { StoreRoleRequest } from "../../requests/role/store-role.request";

export interface RoleService {
  store(request: StoreRoleRequest): Promise<boolean>;
  update(request: StoreRoleRequest, id: number): Promise<boolean>;
}

export const RoleService = Symbol("RoleService");
