import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import config from './common/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.server.port);
}
bootstrap();
