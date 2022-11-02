import { Logger } from "@nestjs/common";
import { DateUtils } from "./date.utils";
import { LogUtils } from "./log.utils";

export class CoreLogger extends Logger {
  private logToFile = false;
  private logToConsole = true;
  private formatLog = false;

  constructor(context?: string, logToFile = false, logToConsole = true) {
    super(context);
    this.logToFile = logToFile;
    this.logToConsole = logToConsole;
  }

  setFormatCode(val: boolean): void {
    this.formatLog = val;
  }

  setLogToFile(val: boolean): void {
    this.logToFile = val;
  }

  setLogToConsole(val: boolean): void {
    this.logToConsole = val;
  }

  simpleStringify(object): string {
    const simpleObject = {};
    for (const prop in object) {
      if (!object.hasOwnProperty(prop)) {
        continue;
      }
      if (typeof object[prop] == "object") {
        continue;
      }
      if (typeof object[prop] == "function") {
        continue;
      }
      simpleObject[prop] = object[prop];
    }

    return JSON.stringify(simpleObject, null, 2); // returns cleaned up JSON
  }

  parseMessageToText(message: any): string {
    if (message instanceof Error) {
      return message.stack;
    }
    if (typeof message == "object") {
      try {
        message = JSON.stringify(message, null, this.formatLog ? 2 : 0);
      } catch (err) {
        message = this.simpleStringify(message);
      }
    }

    return message;
  }

  logOptionalParams(...optionalParams): string[] {
    if (!optionalParams.length) return optionalParams;

    return optionalParams.map((item) => this.parseMessageToText(item));
  }

  parseMessage(message: any, ...optionalParams) {
    message = this.parseMessageToText(message);
    optionalParams = this.logOptionalParams(...optionalParams);
    optionalParams.forEach((item) => {
      message += " " + item;
    });

    return {
      message,
      optionalParams: [],
    };
  }

  log(message: any, ...optionalParams: any[]) {
    const params = this.parseMessage(message, ...optionalParams);
    message = params.message;
    optionalParams = params.optionalParams;
    if (this.logToConsole) {
      super.log(message, ...optionalParams);
    }

    this.writeLog(message, "log", optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    const params = this.parseMessage(message, ...optionalParams);
    message = params.message;
    optionalParams = params.optionalParams;
    if (this.logToConsole) {
      super.error(message, ...optionalParams);
    }

    this.writeLog(message, "error", optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    const params = this.parseMessage(message, ...optionalParams);
    message = params.message;
    optionalParams = params.optionalParams;
    if (this.logToConsole) {
      super.warn(message, ...optionalParams);
    }

    this.writeLog(message, "warn", optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    const params = this.parseMessage(message, ...optionalParams);
    message = params.message;
    optionalParams = params.optionalParams;
    if (this.logToConsole) {
      super.debug(message, ...optionalParams);
    }

    this.writeLog(message, "debug", optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const params = this.parseMessage(message, ...optionalParams);
    message = params.message;
    optionalParams = params.optionalParams;
    if (this.logToConsole) {
      super.verbose(message, ...optionalParams);
    }

    this.writeLog(message, "verbose", optionalParams);
  }

  writeLog(text: string, message: string, optionalParams: string[]): void {
    if (this.logToFile) {
      const timestamp = DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss");
      text = [text, ...optionalParams].join(" ");
      LogUtils[message](`${timestamp} - ${this.context}: ${text}`);
    }
  }
}
