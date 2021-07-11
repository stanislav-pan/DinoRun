import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';
import { initializeSwagger } from './core/initialize-swagger';
import { MapSuccessResultInterceptor } from './core/interceptors/map-success-result.interceptor';

const { DINORUN_API_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new MapSuccessResultInterceptor());

  initializeSwagger(app);

  await app.listen(DINORUN_API_PORT || 3001);
}
bootstrap();
