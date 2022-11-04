import { IStoreModuleRequest } from "../requests/module/store-module.request";
import { PermissionConstant } from "./permission.constant";

export class ModuleConstant {
  static setup(): IStoreModuleRequest[] {
    return [
      {
        name: "User",
        description: "User",
        permissions: [
          {
            name: PermissionConstant.CREATE_NEW_USER,
            description: "Create new user",
          },
          {
            name: PermissionConstant.EDIT_ANY_USER,
            description: "Edit new user",
          },
          {
            name: PermissionConstant.VIEW_ALL_USER,
            description: "View all user",
          },
        ],
      },
    ];
  }
}
