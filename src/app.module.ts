import { Module, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exceptions/http-exception';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';
import { ConfigModule } from './config/config.module';
import { CountryModule } from './country/country.module';
import * as dotenv from 'dotenv';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = dotenv.config().parsed;

@Module({
  imports: [
    MemberModule,
    CountryModule,
    ConfigModule,
    MongooseModule.forRoot(
      `${DB_HOST}://${DB_USER}:${DB_PASSWORD}@${DB_DATABASE}.22wew8y.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
