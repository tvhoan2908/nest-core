import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../../databases/entities/users/user.entity";
import { EUserStatus } from "../../constant/user.enum";
import { StoreUserRequest } from "../../requests/store-user.request";
import { UserImplService } from "./user-impl.service";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useClass: UserImplService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("store()", () => {
    it("should call save()", async () => {
      const request = new StoreUserRequest();
      request.username = "hoantv";
      request.password = "hoantv";
      request.confirmPassword = "hoantv";
      request.email = "hoantv@gmail.com";
      request.fullName = "Hoan Trinh";
      request.status = EUserStatus.ACTIVE;

      await service.store(request);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });
});
