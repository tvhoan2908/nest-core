import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Not, Repository } from "typeorm";
import { User } from "../../../../databases/entities/users/user.entity";
import { DatabaseUtils } from "../../../core/utils/database.utils";
import { FilterUserRequest } from "../../requests/filter-user.request";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UpdateUserRequest } from "../../requests/update-user.request";
import { UserService } from "./user.service";

@Injectable()
export class UserImplService implements UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  findByField(query: FindOptionsWhere<User>, id?: number): Promise<User> {
    if (id) query.id = Not(id);

    return this.userRepository.findOne({
      where: query,
    });
  }

  async checkByUsername(username: string, id?: number): Promise<void> {
    const user = await this.findByField({ username }, id);
    if (user) throw new UnprocessableEntityException("Username alaread exist.");
  }

  async checkByEmail(email: string, id?: number): Promise<void> {
    const user = await this.findByField({ email }, id);
    if (user) throw new UnprocessableEntityException("Email alaread exist.");
  }

  async store(request: StoreUserRequest): Promise<boolean> {
    const entity = await request.toEntity();
    await Promise.all([this.checkByUsername(entity.username), this.checkByEmail(entity.email)]);
    await this.userRepository.save(entity);

    return true;
  }

  async update(request: UpdateUserRequest, id: number): Promise<boolean> {
    const entity = await request.toEntity();
    entity.id = id;
    await Promise.all([this.checkByUsername(entity.username, id), this.checkByEmail(entity.email, id)]);
    await this.userRepository.save(entity);

    return true;
  }

  async findAll(request: FilterUserRequest): Promise<[User[], number]> {
    const query: FindOptionsWhere<User> = {};

    return DatabaseUtils.findAndCount<User>(this.userRepository, request, query);
  }

  findById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
