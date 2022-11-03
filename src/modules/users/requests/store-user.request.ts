import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "../../../databases/entities/users/user.entity";
import { HashUtils } from "../../auth/utils/hash.utils";
import { BaseStoreRequest } from "../../core/requests/base-store.request";
import { BeanUtils } from "../../core/utils/bean.utils";
import { Match } from "../../core/validations/match.decorator";
import { EUserStatus } from "../constant/user.enum";

export interface IStoreUserRequest<T> {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  status: EUserStatus;
  rolesId?: number[];

  toEntity(): T;
}

export class StoreUserRequest extends BaseStoreRequest<User> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match("password", { message: "confirmPassword does not match." })
  confirmPassword: string;

  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  status: EUserStatus;

  rolesId?: number[];

  async toEntity(): Promise<User> {
    const entity = new User();
    entity.username = this.username;
    entity.password = await HashUtils.encrypt(this.password);
    entity.email = this.email;
    entity.fullName = this.fullName;
    entity.status = this.status;

    BeanUtils.removeUndefinedProperties(entity);

    return entity;
  }
}
