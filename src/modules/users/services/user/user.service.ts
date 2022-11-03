import { User } from "../../../../databases/entities/users/user.entity";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";

export interface UserService {
  store(request: StoreUserRequest): Promise<boolean>;
  update(request: UpdateUserRequest, id: number): Promise<boolean>;
  findAll(request: FilterUserRequest): Promise<User[]>;
  findById(id: number): Promise<User>;
}

export const UserService = Symbol("UserService");
