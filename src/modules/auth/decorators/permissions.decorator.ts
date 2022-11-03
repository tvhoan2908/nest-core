import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { PermissionGuard } from "../guards/permission.guard";

export const Permissions = (...permissions: string[]) =>
  applyDecorators(SetMetadata("permissions", permissions), UseGuards(JwtAuthGuard, PermissionGuard));
