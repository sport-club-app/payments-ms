import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: process.env.METRICS_DB_ENGINE,
        host: process.env.METRICS_DB_HOST,
        port: process.env.METRICS_DB_PORT,
        username: process.env.METRICS_DB_USER,
        password: process.env.METRICS_DB_PASSWORD,
        database: process.env.METRICS_DB,
        authSource: 'admin',
        entities: [],
        synchronize: true,
      }),
    ],
  })
export class LoggerDb {}
