import { User } from "../../../databases/entities/users/user.entity";
import { IBaseRelation } from "../../core/resources/base-relation.dto";
import { IUserDto } from "./user.dto";

export class UserMapper {
  static toDTO(request: User): IUserDto {
    const roles: IBaseRelation[] = request.userRoles?.map((item) => ({
      id: item.roleId,
      name: item.role.name,
    }));
    const mapper: IUserDto = {
      id: request.id,
      email: request.email,
      username: request.username,
      status: request.status,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      lastLoginAt: request.lastLoginAt,
      fullName: request.fullName,
      roles,
    };

    return mapper;
  }

  static collections(requests: User[]): IUserDto[] {
    return requests.map((item) => UserMapper.toDTO(item));
  }
}
