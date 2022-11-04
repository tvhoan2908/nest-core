import { InjectRepository } from "@nestjs/typeorm";
import { Command, CommandRunner } from "nest-commander";
import { Repository } from "typeorm";
import { Module } from "../../databases/entities/acl/module";
import { Permission } from "../../databases/entities/acl/permission";
import { User } from "../../databases/entities/users/user.entity";
import { env } from "../../env";
import { ModuleConstant } from "../../modules/acl/constant/module.constant";
import { HashUtils } from "../../modules/auth/utils/hash.utils";
import { ConsoleUtils } from "../../modules/core/utils/console.utils";
import { EAccountType, EUserStatus } from "../../modules/users/constant/user.enum";

@Command({ name: "init:db", description: "Initialize database first time." })
export class InitializeDatabaseCommand extends CommandRunner {
  private readonly logger = new ConsoleUtils(InitializeDatabaseCommand.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Module) private moduleRepository: Repository<Module>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
  ) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    const now = Date.now();
    this.logger.info("Start initializing data.");
    await Promise.all([this.createAdminUser(), this.createPermissions()]);
    this.logger.info("Complete initializing data: " + (Date.now() - now) + " ms");
  }

  async createAdminUser(): Promise<void> {
    this.logger.info("============createAdminUser============");
    const username = env.rootAccount;
    const user = await this.userRepository.findOneBy({ username });
    if (user) {
      this.logger.error(`Username ${username} already exist.`);

      return;
    }
    const entity = new User();
    entity.username = username;
    entity.password = await HashUtils.encrypt(env.rootPassword);
    entity.email = env.rootEmail;
    entity.fullName = "Administrator";
    entity.status = EUserStatus.ACTIVE;
    entity.accountType = EAccountType.SUPER_ADMIN;
    await this.userRepository.save(entity);
    this.logger.success(`Create user ${username} success.`);
    this.logger.info("========================");
  }

  async createPermissions(): Promise<void> {
    this.logger.info("============createPermissions============");
    const modules = ModuleConstant.setup();
    for (const module of modules) {
      // Check if module not exist, then create new
      let entityModule = await this.moduleRepository.findOneBy({ name: module.name });
      if (!entityModule) {
        entityModule = new Module();
        entityModule.name = module.name;
        entityModule.description = module.description;
        await this.moduleRepository.save(entityModule);
      }
      // Check permission not exist, then create new
      for (const permission of module.permissions) {
        let entityPermisison = await this.permissionRepository.findOneBy({ name: permission.name });
        if (!entityPermisison) {
          entityPermisison = new Permission();
          entityPermisison.name = permission.name;
          entityPermisison.description = permission.description;
          entityPermisison.moduleId = entityModule.id;
          await this.permissionRepository.save(entityPermisison);
        }
      }
    }
    this.logger.info("==========End==createPermissions============");
  }
}
