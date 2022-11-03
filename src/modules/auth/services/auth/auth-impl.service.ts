import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { RolePermission } from "../../../../databases/entities/acl/role_permission";
import { User } from "../../../../databases/entities/users/user.entity";
import { EUserStatus } from "../../../users/constant/user.enum";
import { LoginRequest } from "../../requests/login.request";
import { HashUtils } from "../../utils/hash.utils";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthImplService implements AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RolePermission) private permissionRepository: Repository<RolePermission>,
  ) {}

  async login(request: LoginRequest): Promise<string> {
    const user = await this.userRepository.findOneBy({
      username: request.username,
    });
    if (!user) throw new UnauthorizedException("username does not exist.");
    if (user.status != EUserStatus.ACTIVE) throw new UnauthorizedException("username is disabled.");
    const isValidPassword = await HashUtils.compare(request.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException("password is invalid.");

    return this.generateToken(user.id);
  }

  getPermissionsByRolesId(rolesId: number[]): Promise<RolePermission[]> {
    return this.permissionRepository.find({
      relations: ["permission"],
      where: {
        roleId: In(rolesId),
      },
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
