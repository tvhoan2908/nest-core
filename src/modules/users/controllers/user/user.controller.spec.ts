import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../../databases/entities/users/user.entity";
import { UserImplService } from "../../services/user/user-impl.service";
import { UserService } from "../../services/user/user.service";
import { UserController } from "./user.controller";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserImplService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
