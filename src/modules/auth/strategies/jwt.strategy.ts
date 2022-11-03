import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "../../../env";
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

  async validate(payload: { userId: number }): Promise<ILoggedInUser> {
    const user = await this.authService.findById(payload.userId);
    if (!user) throw new UnauthorizedException();
    const permissions = [];

    return {
      userId: user.id,
      permissions,
      username: user.username,
      fullName: user.fullName,
      accountType: user.accountType,
    };
  }
}
