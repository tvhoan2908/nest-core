import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Permissions } from "../../../auth/decorators/permissions.decorator";
import { ParseClassPipe } from "../../../core/pipes/parse-class.pipe";
import { IBaseResponse, ResponseEntity } from "../../../core/resources/base-response";
import { StoreRoleRequest } from "../../requests/role/store-role.request";
import { RoleService } from "../../services/role/role.service";

@Controller("api/v1/roles")
export class RoleController {
  constructor(@Inject(RoleService) private roleService: RoleService) {}

  @Post()
  @Permissions()
  async store(@Body(ParseClassPipe) request: StoreRoleRequest): Promise<IBaseResponse<boolean>> {
    const response = await this.roleService.store(request);

    return new ResponseEntity<boolean>(response);
  }

  @Put("/:id")
  @Permissions()
  async update(@Body(ParseClassPipe) request: StoreRoleRequest, @Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    const response = await this.roleService.update(request, id);

    return new ResponseEntity<boolean>(response);
  }
}
