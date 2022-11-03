import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../databases/entities/users/user.entity";
import { UserImplService } from "./services/user/user-impl.service";
import { UserController } from "./controllers/user/user.controller";
import { UserService } from "./services/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserService,
      useClass: UserImplService,
    },
  ],
  controllers: [UserController],
})
export class UsersModule {}
