import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Golden Raspberry Awards API')
    .setDescription('API RESTful para consultar informações sobre os indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards. O objetivo principal é fornecer dados sobre os produtores com o maior e menor intervalo entre prêmios consecutivos.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('PORT', 0));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
