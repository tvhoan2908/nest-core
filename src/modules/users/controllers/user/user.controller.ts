import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Permissions } from "../../../auth/decorators/permissions.decorator";
import { BaseController } from "../../../core/controllers/base.controller";
import { ParseClassPipe } from "../../../core/pipes/parse-class.pipe";
import { IBaseResponse, ResponseEntity } from "../../../core/resources/base-response";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";
import { IUserDto } from "../../resources/user.dto";
import { UserMapper } from "../../resources/user.mapper";
import { UserService } from "../../services/user/user.service";

@Controller("api/v1/users")
export class UserController extends BaseController {
  constructor(@Inject(UserService) private userService: UserService) {
    super();
  }

  @Post()
  @Permissions()
  async store(@Body(ParseClassPipe) request: StoreUserRequest): Promise<IBaseResponse<boolean>> {
    const response = await this.userService.store(request);

    return new ResponseEntity<boolean>(response);
  }

  @Put("/:id")
  @Permissions()
  async update(@Body(ParseClassPipe) request: UpdateUserRequest, @Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    const response = await this.userService.update(request, id);

    return new ResponseEntity<boolean>(response);
  }

  @Get()
  @Permissions()
  async findAll(@Query(ParseClassPipe) request: FilterUserRequest): Promise<IBaseResponse<IUserDto[]>> {
    const response = await this.userService.findAll(request);
    const items = UserMapper.collections(response[0]);

    return this.findAndPaginate<IUserDto>(request, items, response[1]);
  }

  @Get("/:id")
  @Permissions()
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    const response = await this.userService.findById(id);

    return new ResponseEntity<IUserDto>(UserMapper.toDTO(response));
  }
}
