import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethods } from '../../../app/modules/payment-methods/payment-methods.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_ENGINE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [PaymentMethods],
      synchronize: true,
    }),
  ],
})
export class DbSqlModule {}
