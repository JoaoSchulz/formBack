import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000', // Para desenvolvimento local
    'https://formulario-front-five.vercel.app', // Domínio do frontend no Vercel
  ];

  app.enableCors({
    origin: (origin, callback) => {
      console.log('Origin:', origin); // Adicione este log para depuração
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir cookies ou autenticação
  });

  await app.listen(8080);
}
bootstrap();