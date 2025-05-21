import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para aceitar todas as origens
  app.enableCors({
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    credentials: true, // Permitir cookies ou autenticação
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos necessários
  });

  await app.listen(8080);
}
bootstrap();