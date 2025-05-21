import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000', // Para desenvolvimento local
    'https://formulario-front-five.vercel.app', // Origem anterior
    'https://formulario-front-9qxdayrt7-joao-schulzs-projects.vercel.app', // Nova origem
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('Blocked by CORS:', origin); // Log de erro
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Inclua o método OPTIONS
    credentials: true, // Permitir cookies ou autenticação
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos necessários
  });

  await app.listen(8080);
}
bootstrap();