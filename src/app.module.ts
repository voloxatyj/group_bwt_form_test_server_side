import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utility/http-exception';
import { MemberModule } from './member/member.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CountryModule } from './country/country.module';

@Module({
  imports: [MemberModule, CountryModule, ConfigModule],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('members', 'countries');
  }
}
