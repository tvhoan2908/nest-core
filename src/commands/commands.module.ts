import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import OrmConfig from "../config/database.config";
import { User } from "../databases/entities/users/user.entity";
import { InitializeDatabaseCommand } from "./startup/initialize-database.command";

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), TypeOrmModule.forFeature([User])],
  providers: [InitializeDatabaseCommand],
})
export class CommandsModule {}
