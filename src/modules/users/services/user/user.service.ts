import { FindOptionsWhere } from "typeorm";
import { User } from "../../../../databases/entities/users/user.entity";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";

export interface UserService {
  store(request: StoreUserRequest): Promise<boolean>;
  update(request: UpdateUserRequest, id: number): Promise<boolean>;
  findAll(request: FilterUserRequest): Promise<[User[], number]>;
  findById(id: number): Promise<User>;
  checkByUsername(username: string, id?: number): Promise<void>;
  checkByEmail(email: string, id?: number): Promise<void>;
  findByField(query: FindOptionsWhere<User>, id?: number): Promise<User>;
}

export const UserService = Symbol("UserService");
