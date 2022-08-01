import { Injectable, Inject, ConsoleLogger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerMiddlewareDtoCreate } from './logger.middleware.create.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { uuid } from 'uuidv4';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
@Injectable()
export class LoggerService {
  constructor(
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @OnEvent('middleware.logs.created')
  handleLoggerCreatedEvent(event: LoggerMiddlewareDtoCreate) {
    this.logger.info('middleware-logs', event);
    this.kafkaClient.emit('payments.logs', {
      key: event.traceId,
      value: JSON.stringify(event),
    });
  }

  // @EventPattern('payments.logs')
  // readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
  //   const originalMessage = context.getMessage();
  //   const response =
  //     `Receiving a new message from topic: medium.rocks: ` +
  //     JSON.stringify(originalMessage);
  //   console.log({ teste: response });
  // }
}
