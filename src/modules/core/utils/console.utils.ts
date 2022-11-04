import * as chalk from "chalk";
export class ConsoleUtils {
  private fileName: string;
  private readonly logger = console.log;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  success(message: unknown): void {
    this.logger(chalk.green(`[${this.fileName}]: ${JSON.stringify(message)}`));
  }

  error(message: unknown): void {
    this.logger(chalk.red(`[${this.fileName}]: ${JSON.stringify(message)}`));
  }

  info(message: unknown): void {
    this.logger(chalk.blueBright(`[${this.fileName}]: ${JSON.stringify(message)}`));
  }

  warn(message: unknown): void {
    this.logger(chalk.yellow(`[${this.fileName}]: ${JSON.stringify(message)}`));
  }
}
