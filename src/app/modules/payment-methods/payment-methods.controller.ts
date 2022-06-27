import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './create-payment-methods.dto';
import { IPaymentMethods } from './interfaces/payment-methods.interface';
import { DeleteResult } from 'typeorm';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @Post()
  async create(
    @Body() paymentMethods: CreatePaymentMethodDto,
  ): Promise<IPaymentMethods | HttpException> {
    const paymentMethod = await this.paymentMethodsService.create(
      paymentMethods,
    );
    if (!paymentMethod)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'payment-method: error processing request',
        },
        HttpStatus.BAD_REQUEST,
      );
    return paymentMethod;
  }

  @Get()
  async findAll(): Promise<IPaymentMethods[]> {
    const paymentMethods = await this.paymentMethodsService.findAll();
    if (!paymentMethods)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'payment-method: not found',
        },
        HttpStatus.NOT_FOUND,
      );
    return paymentMethods;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IPaymentMethods> {
    const paymentMethod = await this.paymentMethodsService.findOne(id);
    if (!paymentMethod)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'payment-method: not found',
        },
        HttpStatus.NOT_FOUND,
      );
    return paymentMethod;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const resData = await this.paymentMethodsService.delete(id);
    if (resData.affected == 0)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'payment-method: error processing request',
        },
        HttpStatus.BAD_REQUEST,
      );
    return resData;
  }
}
