import { Logger } from '@nestjs/common';
import { Controller, Inject } from '@nestjs/common/decorators';
import { MqttClient } from 'mqtt';
import { MqttService } from './mqtt.services';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller('/mqtt')
export class MqttController {
  private readonly logger = new Logger(MqttController.name);

  constructor(
    @Inject('MQTT') private client: MqttClient,
    private mqqtService: MqttService,
  ) {}

  @MessagePattern('securing-devops')
  async litterMessagev2(
    @Payload() payload: string,
    @Ctx() context: MqttContext,
  ) {
    const topic = context.getTopic();
    this.logger.debug(`Received message on topic: ${topic} with payload: ${payload}`);
  }

}
