import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ParseClassPipe } from "../../../core/pipes/parse-class.pipe";
import { IBaseResponse } from "../../../core/resources/base-response";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";
import { UserService } from "../../services/user/user.service";

@Controller("user")
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post()
  async store(@Body(ParseClassPipe) request: StoreUserRequest): Promise<IBaseResponse<boolean>> {
    return null;
  }

  @Put("/:id")
  async update(@Body(ParseClassPipe) request: UpdateUserRequest, @Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    return null;
  }

  @Get()
  async findAll(@Query(ParseClassPipe) request: FilterUserRequest): Promise<IBaseResponse<boolean>> {
    return null;
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<IBaseResponse<boolean>> {
    return null;
  }
}
