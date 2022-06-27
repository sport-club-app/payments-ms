import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentMethodsModule } from './app/modules/payment-methods/payment-methods.module';
import { HealthController } from './app/controllers/health/health.controller';
import { DbSqlModule } from './tools/modules/db-sql/db-sql.module';
import { LoggerModule } from './tools/modules/logger/logger.module';
import { LoggerMiddleware } from './app/middlewares/logger.middleware';
import { KafkaModule } from './tools/modules/kafka/kafka.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentMethodsModule,
    DbSqlModule,
    LoggerModule,
    KafkaModule,
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('payment-methods');
  }
}
