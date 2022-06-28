import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerMiddlewareDtoCreate } from './logger.middleware.create.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { uuid } from 'uuidv4';

@Injectable()
export class LoggerService {
  constructor(@Inject('KAFKA_CLIENT') private kafkaProducer: Producer) {}

  @OnEvent('middleware.logs.created')
  handleLoggerCreatedEvent(event: LoggerMiddlewareDtoCreate) {
    this.kafkaProducer.send({
      topic: 'payments-logs',
      messages: [{ key: uuid(), value: JSON.stringify(event) }],
    });
  }
}
