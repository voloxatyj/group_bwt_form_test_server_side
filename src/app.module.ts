import { Module, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exceptions/http-exception';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';
import { ConfigModule } from './config/config.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    MemberModule,
    CountryModule,
    ConfigModule,
    MongooseModule.forRoot(
      `mongodb+srv://admin:groupbwt@hVoSh3444rxVCyYi.22wew8y.mongodb.net/?retryWrites=true&w=majority`,
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
