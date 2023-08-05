import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQService {
  async listenToQueue(queueName: string, callback: (message: any) => void): Promise<void> {
    const connection = await connect('amqp://user:password@localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    
    channel.consume(queueName, (message) => {
      if (message !== null) {
         const content = message.content.toString();
    
        callback(content);
        
        channel.ack(message);
      }
    });
   
  }
}
