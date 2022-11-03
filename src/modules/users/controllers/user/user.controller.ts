import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Permissions } from "../../../auth/decorators/permissions.decorator";
import { ParseClassPipe } from "../../../core/pipes/parse-class.pipe";
import { IBaseResponse, ResponseEntity } from "../../../core/resources/base-response";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";
import { UserService } from "../../services/user/user.service";

@Controller("api/v1/users")
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post()
  @Permissions()
  async store(@Body(ParseClassPipe) request: StoreUserRequest): Promise<IBaseResponse<boolean>> {
    const response = await this.userService.store(request);

    return new ResponseEntity<boolean>(response);
  }

  @Put("/:id")
  @Permissions()
  async update(@Body(ParseClassPipe) request: UpdateUserRequest, @Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    return null;
  }

  @Get()
  @Permissions()
  async findAll(@Query(ParseClassPipe) request: FilterUserRequest): Promise<IBaseResponse<boolean>> {
    return null;
  }

  @Get("/:id")
  @Permissions()
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    return null;
  }
}
