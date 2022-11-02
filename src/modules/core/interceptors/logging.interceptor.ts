import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { map, Observable, tap } from "rxjs";
import { CoreLogger } from "../utils/logger.utils";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new CoreLogger(LoggingInterceptor.name, true);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    // const user = <LoggedInUserInterface>request.user;
    const { ip, method, path: url } = request;
    const userAgent = request.get("user-agent") || "";
    this.logger.log(`Before request...${url}: ${now}`);
    this.logger.log(
      `${url}: METHOD: ${method}, ` +
        `Params: ${JSON.stringify(request.params)}, ` +
        `Query: ${JSON.stringify(request.query)}, ` +
        `Body: ${JSON.stringify(request.body)}, ` +
        `UserAgent: ${userAgent}, ` +
        `IP: ${ip}, `,
      // `User: ${user?.userId}-${user?.username}`,
    );

    return next.handle().pipe(
      tap(() => this.logger.log(`After request...${url}: ${Date.now()} ${Date.now() - now}ms`)),
      map((data) => data),
    );
  }
}
