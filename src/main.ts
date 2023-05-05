import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 5000;
  await app.listen(port);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  logger.log(`Application listetin on port ${port}`);
}
bootstrap();
