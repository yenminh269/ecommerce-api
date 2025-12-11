import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //auto remove all the field that not have decorator in DTO
    forbidNonWhitelisted: true, //throw error if there is any field that not have decorator in DTO
    transform: true, //automatically transform the payload to be instance of DTO class
    transformOptions: {
      enableImplicitConversion: true,
    }, //convert user data type to the assigned type in DTO
    exceptionFactory: (validationError) => {
      return new UnprocessableEntityException(
        validationError.map((error: ValidationError) => ({
          property: error.property,
          constraints: Object.values(error.constraints as any).join(',')
        })),
      );
    }}
  )); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
