import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttModule } from 'mqtt/mqtt.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('HTTP_PORT');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`API Gateway listen on ${port}`);

  const mqttService = await NestFactory.createMicroservice<MicroserviceOptions>(
    MqttModule,
    {
      transport: Transport.MQTT,
      options: {
        url: configService.get('MQTT_URL') || 'mqtt://localhost:1883',
        username: configService.get('MQTT_USERNAME') || 'novandsat',
        password: configService.get('MQTT_PASSWORD') || 'password',
      },
    },
  );
  mqttService.listen();
  logger.log('MQTT Gateway listen on 1883');
}
bootstrap();
