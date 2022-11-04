import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "../../databases/entities/acl/permission";
import { Role } from "../../databases/entities/acl/role";
import { RolePermission } from "../../databases/entities/acl/role_permission";
import { RoleController } from "./controllers/role/role.controller";
import { RoleImplService } from "./services/role/role-impl.service";
import { RoleService } from "./services/role/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, RolePermission])],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleService,
      useClass: RoleImplService,
    },
  ],
})
export class AclModule {}
