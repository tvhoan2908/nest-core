import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import OrmConfig from "../config/database.config";
import { User } from "../databases/entities/users/user.entity";
import { Module as ModuleEntity } from "../databases/entities/acl/module";
import { InitializeDatabaseCommand } from "./startup/initialize-database.command";
import { Permission } from "../databases/entities/acl/permission";

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), TypeOrmModule.forFeature([User, ModuleEntity, Permission])],
  providers: [InitializeDatabaseCommand],
})
export class CommandsModule {}
