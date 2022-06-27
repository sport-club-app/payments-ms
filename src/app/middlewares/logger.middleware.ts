import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { uuid } from 'uuidv4';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const data = {
      middleware: LoggerMiddleware.name,
      ip: req.ip,
      method: req.method,
      path: req.path,
      host: req.headers.host,
      agent: req.headers['sec-ch-ua'],
      platform: req.headers['sec-ch-ua-platform'],
      origin: req.headers.origin,
      token: req.headers.authorization,
    };
    this.kafkaProducer.send({
      topic: 'payments-logs',
      messages: [{ key: uuid(), value: JSON.stringify(data) }],
    });
    this.logger.info('guard', data);
    next();
  }
}
