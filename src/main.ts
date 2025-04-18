import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Snapify')
    .setDescription('photo api')
    .setVersion('1.0')
    .addTag('users') // Optional tags
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
