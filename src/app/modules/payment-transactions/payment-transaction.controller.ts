import { Body, Controller, Post } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';

@Controller('payment-transaction')
export class PaymentTransactionController {
  constructor(private paymentTransactionService: PaymentTransactionService) {}

  @Post("execute")
  async execute(@Body() body: any) {
    return this.paymentTransactionService.execute(body)
  }
}
