import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../../databases/entities/users/user.entity";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";
import { UserService } from "./user.service";

@Injectable()
export class UserImplService implements UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async store(request: StoreUserRequest): Promise<boolean> {
    const entity = await request.toEntity();
    await this.userRepository.save(entity);

    return true;
  }

  update(request: UpdateUserRequest, id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findAll(request: FilterUserRequest): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
