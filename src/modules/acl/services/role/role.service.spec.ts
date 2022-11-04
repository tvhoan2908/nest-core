import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Permission } from "../../../../databases/entities/acl/permission";
import { Role } from "../../../../databases/entities/acl/role";
import { RoleImplService } from "./role-impl.service";
import { RoleService } from "./role.service";

describe("RoleService", () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoleService,
          useClass: RoleImplService,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
