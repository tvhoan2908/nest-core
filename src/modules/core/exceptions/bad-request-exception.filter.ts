import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { CoreLogger } from "../utils/logger.utils";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new CoreLogger(BadRequestExceptionFilter.name, true);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errors = exception.getResponse();

    const messageResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      errors: errors["message"] || [],
    };

    this.logger.error(`${request.method} ${request.url}`, messageResponse);

    response.status(status).json(messageResponse);
  }
}
