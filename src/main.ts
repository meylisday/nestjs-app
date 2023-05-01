import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = 3000;
  logger.log(`Application listetin on port ${port}`);
}
bootstrap();
