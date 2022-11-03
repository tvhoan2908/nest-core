import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "../../../env";
import { CoreLogger } from "../../core/utils/logger.utils";
import { ILoggedInUser } from "../resources/logged-user.type";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwtSecretKey,
    });
  }
  private readonly logger = new CoreLogger(JwtStrategy.name);

  async validate(payload: { userId: number }): Promise<ILoggedInUser> {
    const user = await this.authService.findById(payload.userId);
    if (!user) throw new UnauthorizedException();
    this.logger.debug("hasUser: ");
    const rolesId = user.userRoles.map((item) => item.roleId);
    const permissions = [];
    if (rolesId.length > 0) {
      const userPermissions = await this.authService.getPermissionsByRolesId(rolesId);
      userPermissions.forEach((item) => {
        if (!permissions.includes(item.permission.name)) {
          permissions.push(item.permission.name);
        }
      });
    }

    return {
      userId: user.id,
      permissions,
      username: user.username,
      fullName: user.fullName,
      accountType: user.accountType,
    };
  }
}
