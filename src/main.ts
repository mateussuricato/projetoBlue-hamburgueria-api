import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Modulo 4')
    .setDescription('Aplicação do Modulo 4 Blue Backend')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('users')
    .addTag('products')
    .addTag('tables')
    .addTag('categories')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
