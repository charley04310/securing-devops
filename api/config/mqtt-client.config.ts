import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const mqttClientConfig: ClientsModuleOptions = [
  {
    name: 'MQTT',
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  },
];
