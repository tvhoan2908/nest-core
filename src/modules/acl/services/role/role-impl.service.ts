import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Permission } from "../../../../databases/entities/acl/permission";
import { Role } from "../../../../databases/entities/acl/role";
import { RolePermission } from "../../../../databases/entities/acl/role_permission";
import { BeanUtils } from "../../../core/utils/bean.utils";
import { StoreRoleRequest } from "../../requests/role/store-role.request";
import { RoleService } from "./role.service";

@Injectable()
export class RoleImplService implements RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async store(request: StoreRoleRequest): Promise<boolean> {
    const entity = await request.toEntity();
    await this.save(request, entity);

    return true;
  }

  async update(request: StoreRoleRequest, id: number): Promise<boolean> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) throw new UnprocessableEntityException("record does not exist.");
    const entity = await request.toEntity();
    BeanUtils.copyProperties(entity, role);
    await this.rolePermissionRepository.softDelete({ roleId: role.id });
    await this.save(request, role);

    return true;
  }

  async save(request: StoreRoleRequest, entity: Role): Promise<void> {
    // Check permissionsId exist
    const totalPermission = await this.permissionRepository.countBy({ id: In(request.permissionsId) });
    if (totalPermission != request.permissionsId.length) throw new UnprocessableEntityException("permissionsId does not exist.");
    await this.roleRepository.save(entity);
    const rolePermisisons = request.permissionsId.map((permissionId) => new RolePermission({ permissionId, roleId: entity.id }));
    await this.rolePermissionRepository.insert(rolePermisisons);
  }
}
