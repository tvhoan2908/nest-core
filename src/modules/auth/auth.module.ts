import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../databases/entities/users/user.entity";
import { env } from "../../env";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./services/auth/auth.service";
import { AuthImplService } from "./services/auth/auth-impl.service";
import { RolePermission } from "../../databases/entities/acl/role_permission";
import { AuthController } from "./controllers/auth/auth.controller";

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecretKey,
      signOptions: {
        expiresIn: "1d",
      },
    }),
    TypeOrmModule.forFeature([User, RolePermission]),
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthImplService,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
