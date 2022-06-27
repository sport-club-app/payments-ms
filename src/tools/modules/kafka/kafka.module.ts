import { Module, Provider } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';

const kafkaProvider: Provider = {
  provide: 'KAFKA_PRODUCER',
  useFactory: async (kafkaClient: ClientKafka) => {
    return kafkaClient.connect();
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
            groupId: `${process.env.KAFKA_CLIENT_ID}`,
          },
        },
      },
    ]),
  ],
  providers: [kafkaProvider],
  exports: [kafkaProvider],
})
export class KafkaModule {}
