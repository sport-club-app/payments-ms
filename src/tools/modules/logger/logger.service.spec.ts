import { Test, TestingModule } from '@nestjs/testing';
import { LoggerStreamService } from './logger-stream.service';

describe('Logger', () => {
  let service: LoggerStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerStreamService],
    }).compile();

    service = module.get<LoggerStreamService>(LoggerStreamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
