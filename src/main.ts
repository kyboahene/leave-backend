import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Leave system API')
    .setDescription('The leave system API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // const redocOptions: RedocOptions = {
  //   title: 'Leave System API',
  //   logo: {
  //     url: 'https://cocobod.gh/frontend/img/Cocobod Logo-01.png',
  //     backgroundColor: '#F0F0F0',
  //     altText: 'Cocobod logo'
  //   },
  //   sortPropsAlphabetically: true,
  //   hideDownloadButton: false,
  //   hideHostname: false,
  // };
  // await RedocModule.setup('/docs', app, document, redocOptions);

  await app.listen(process.env.PORT);
}
bootstrap();
