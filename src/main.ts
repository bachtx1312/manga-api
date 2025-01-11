import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from '@/core/configs/system';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(ENV.API_PREFIX);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(ENV.PORT);
}
bootstrap();
