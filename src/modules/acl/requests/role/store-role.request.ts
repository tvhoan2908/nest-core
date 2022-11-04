import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "../../../../databases/entities/acl/role";
import { BaseStoreRequest } from "../../../core/requests/base-store.request";

export class StoreRoleRequest extends BaseStoreRequest<Role> {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @ArrayNotEmpty()
  @IsArray()
  permissionsId: number[];

  async toEntity(): Promise<Role> {
    const entity = new Role();
    entity.name = this.name;
    entity.description = this.description;

    return entity;
  }
}
