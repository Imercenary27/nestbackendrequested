import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from 'rabbitmq/rabbitmq';
import { RegistryService } from './registry/registry.service';
import { RegistryController } from './registry/registry.controller';
import { RegistryModule } from './registry/registry.module';
import { MongooseModule } from '@nestjs/mongoose';
import {REGISTRATION_MODEL, Registration, RegistrationScehma} from './schema/reg.schema'


@Module({
  imports: [
    RegistryModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/rtodatabase'),
  
   
    
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  
}
