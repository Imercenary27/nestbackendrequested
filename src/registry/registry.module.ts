import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { REGISTRATION_MODEL, Registration, RegistrationScehma } from '../schema/reg.schema';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { RabbitMQService } from 'rabbitmq/rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CameraInput, CameraInputScehma } from 'src/schema/camera.schema';
import { Fregis, FaceDataScehma } from 'src/schema/facedata.schema';
import { Facify, FacifyScehma } from 'src/schema/newface.schema';


@Module({
    imports:[
      MongooseModule.forFeature([{
        name: Registration.name, 
        schema:RegistrationScehma
      }]),
      MongooseModule.forFeature([{
        name: CameraInput.name, 
        schema:CameraInputScehma
      }]),
      MongooseModule.forFeature([{
      name: Fregis.name, 
      schema:FaceDataScehma
      }]),  
      MongooseModule.forFeature([{
        name: Facify.name, 
        schema:FacifyScehma
        }]),
        ClientsModule.register([
            {
              name: 'number_service',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://user:password@localhost:5672'],
                queue: 'numberplaterec',
                queueOptions: {
                  durable: false
                },
              },
            },
          ]),
    ],
    controllers: [RegistryController],
    providers:[RegistryService,RabbitMQService],
 
   

 
})
export class RegistryModule {}
