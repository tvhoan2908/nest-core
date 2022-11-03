import { InjectRepository } from "@nestjs/typeorm";
import * as chalk from "chalk";
import { Command, CommandRunner } from "nest-commander";
import { Repository } from "typeorm";
import { User } from "../../databases/entities/users/user.entity";
import { env } from "../../env";
import { HashUtils } from "../../modules/auth/utils/hash.utils";
import { EAccountType, EUserStatus } from "../../modules/users/constant/user.enum";

@Command({ name: "init:db", description: "Initialize database first time." })
export class InitializeDatabaseCommand extends CommandRunner {
  private readonly logger = console.log;
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    const now = Date.now();
    this.logger(chalk.green("Start initializing data."));
    await Promise.all([this.createAdminUser()]);
    this.logger(chalk.green("Complete initializing data: " + (Date.now() - now) + " ms"));
  }

  async createAdminUser(): Promise<void> {
    const username = env.rootAccount;
    const user = await this.userRepository.findOneBy({ username });
    if (user) {
      this.logger(chalk.red(`${username} already exist.`));

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
    this.logger(chalk.green(`Create user ${username} successfully!`));
  }
}
