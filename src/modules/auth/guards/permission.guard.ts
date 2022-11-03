import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CoreLogger } from "../../core/utils/logger.utils";
import { EAccountType } from "../../users/constant/user.enum";
import { ILoggedInUser } from "../resources/logged-user.type";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  private readonly logger = new CoreLogger(PermissionGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user: ILoggedInUser = request.user;
      const userPermissions = user.permissions;
      if (user.accountType == EAccountType.SUPER_ADMIN) return true;

      const permissions = this.reflector.getAllAndOverride<string[]>("permissions", [context.getHandler(), context.getClass()]);

      if (!permissions.length) return true;
      if (!userPermissions.length) return false;

      // Kiem tra xem user co tat ca quyen nhu mong doi khong ?
      const samePermissions = permissions.filter((item) => userPermissions.includes(item));
      if (!samePermissions.length) return false;

      return true;
    } catch (err) {
      this.logger.error("PermissionGuard-canActivate-error", err);

      return false;
    }
  }
}
