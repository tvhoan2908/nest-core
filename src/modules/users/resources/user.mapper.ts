import { User } from "../../../databases/entities/users/user.entity";
import { IUserDto } from "./user.dto";

export class UserMapper {
  static toDTO(request: User): IUserDto {
    const entityMapper: IUserDto = {
      id: request.id,
      email: request.email,
      username: request.username,
      status: request.status,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      lastLoginAt: request.lastLoginAt,
      fullName: request.fullName,
      roles: [],
    };

    return entityMapper;
  }

  static collections(requests: User[]): IUserDto[] {
    return requests.map((item) => UserMapper.toDTO(item));
  }
}
