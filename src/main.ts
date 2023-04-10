import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
import { ValidationConfig } from './config/validation.config';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ValidatorModule } from './validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  const configService = app.get(ConfigService);

  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  app.setGlobalPrefix(configService.get<string>('apiPrefix' as never));

  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });

  const port = configService.get<number>('port' as never);
  await app.listen(port);
}

bootstrap();
