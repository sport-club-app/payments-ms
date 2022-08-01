import { Injectable } from '@nestjs/common';
import { IPaymentTransactionService } from './interfaces/payment-transaction.service.interface';
import axios from "axios"

@Injectable()
export class PaymentTransactionService implements IPaymentTransactionService {
  async execute(data: any): Promise<any> {
    
  }
}
