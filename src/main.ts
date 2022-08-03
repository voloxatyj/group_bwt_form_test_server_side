import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utility/http-exception';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Http Error Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Rest API')
    .setDescription('Rest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  const logger = app.get(Logger);
  app.setGlobalPrefix('api');
  const { SERVER_PORT } = dotenv.config().parsed;
  await app.listen(SERVER_PORT || 5000);
  logger.log(`Application listening at ${await app.getUrl()}`);
}
bootstrap();
