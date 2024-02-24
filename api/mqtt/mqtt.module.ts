import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.services';
import { ClientsModule } from '@nestjs/microservices';
import { mqttClientConfig } from 'config/mqtt-client.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig),
    ClientsModule.register(mqttClientConfig),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
