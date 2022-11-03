import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "../../../databases/entities/users/user.entity";
import { HashUtils } from "../../auth/utils/hash.utils";
import { BaseStoreRequest } from "../../core/requests/base-store.request";
import { BeanUtils } from "../../core/utils/bean.utils";
import { Match } from "../../core/validations/match.decorator";
import { EUserStatus } from "../constant/user.enum";

export class UpdateUserRequest extends BaseStoreRequest<User> {
  @IsOptional()
  password: string;

  @IsOptional()
  @Match("password", { message: "confirmPassword does not match." })
  confirmPassword: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  status: EUserStatus;

  rolesId?: number[];

  async toEntity(): Promise<User> {
    const entity = new User();
    if (this.password) {
      entity.password = await HashUtils.encrypt(this.password);
    }

    entity.fullName = this.fullName;
    entity.status = this.status;

    BeanUtils.removeUndefinedProperties(entity);

    return entity;
  }
}
