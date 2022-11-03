import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { RolePermission } from "../../../../databases/entities/acl/role_permission";
import { User } from "../../../../databases/entities/users/user.entity";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthImplService implements AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RolePermission) private permissionRepository: Repository<RolePermission>,
  ) {}

  getPermissionsByRolesId(rolesId: number[]): Promise<RolePermission[]> {
    return this.permissionRepository.findBy({
      roleId: In(rolesId),
    });
  }

  findById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      relations: ["userRoles"],
      where: {
        id: userId,
      },
    });
  }

  generateToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}
