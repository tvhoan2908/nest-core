import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "../../../databases/entities/users/user.entity";
import { HashUtils } from "../../auth/utils/hash.utils";
import { BeanUtils } from "../../core/utils/bean.utils";
import { Match } from "../../core/validations/match.decorator";
import { UpdateUserRequest } from "./update-user.request";

export class StoreUserRequest extends UpdateUserRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match("password", { message: "confirmPassword does not match." })
  confirmPassword: string;

  @IsOptional()
  email: string;

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
