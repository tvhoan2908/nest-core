import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrmConfig } from "./config/database.config";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
