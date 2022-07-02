import { Module, Provider, Global } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';


const kafkaClient: Provider = {
  provide: 'KAFKA_CLIENT',
  useFactory: async (kafkaClient: ClientKafka) => {
    return kafkaClient;
  },
  inject: ['CLIENT_KAFKA'],
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: process.env.KAFKA_CLIENT_ID,
            // sessionTimeout: 60000,
            // heartbeatInterval: 40000,
            // maxWaitTimeInMs: 43000,
            // retry: { retries: 30 },
          },
        },
      },
    ]),
  ],
  providers: [kafkaClient],
  exports: [kafkaClient],
})
export class KafkaModule {}
