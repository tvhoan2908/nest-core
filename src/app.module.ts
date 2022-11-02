import { Module, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmConfig } from "./config/database.config";
import { BadRequestExceptionFilter } from "./modules/core/exceptions/bad-request-exception.filter";
import { GlobalExceptionFilter } from "./modules/core/exceptions/global-exception.filter";
import { LoggingInterceptor } from "./modules/core/interceptors/logging.interceptor";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
