import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("App started on 3000")
  app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
      urls: ['amqp://user:password@localhost:5672/'],
      queue: 'numberplaterec',
      queueOptions: {
        durable: false
      },
    },
  
    });

    await app.startAllMicroservices();
}
bootstrap();
