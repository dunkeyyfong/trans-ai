import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
