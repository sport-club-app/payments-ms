import { Module, Provider, Global } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import { uuid } from 'uuidv4';

const kafkaClient: Provider = {
  provide: 'KAFKA_CLIENT',
  useFactory: async (kafkaClient: ClientKafka) => {
    return kafkaClient.connect();
  },
  inject: ['CLIENT_KAFKA'],
};

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId:
              process.env.NODE_ENV === 'development'
                ? `${process.env.KAFKA_CLIENT_ID}-${uuid()}`
                : process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: `${process.env.KAFKA_CLIENT_ID}`,
          },
        },
      },
    ]),
  ],
  providers: [kafkaClient],
  exports: [kafkaClient],
})
export class KafkaModule {}
