import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http-exceptions/http-exception';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  app.enableCors();

  // Http Error Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  // Set Validation to Global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Set HTTP request logger
  app.use(morgan('tiny', { stream: logStream }));

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
  await app.listen(process.env.PORT || 5000, process.env.HOST);
  logger.log(`Application listening at ${await app.getUrl()}`);
}
bootstrap();
