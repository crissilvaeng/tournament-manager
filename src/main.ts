import 'reflect-metadata';

import * as Case from 'case';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.PORT,
      url: process.env.NATS_URL,
    },
  });

  app.use(compression());
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle(Case.title(process.env.npm_package_name))
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT);
}
bootstrap();
