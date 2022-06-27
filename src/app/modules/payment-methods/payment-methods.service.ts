import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { PaymentMethods } from './payment-methods.entity';
import { IPaymentMethods, IPaymentMethodsService } from './interfaces';
import { CreatePaymentMethodDto } from './create-payment-methods.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PaymentMethodsService implements IPaymentMethodsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(PaymentMethods)
    private paymentMethodsRepository: Repository<PaymentMethods>,
  ) {}

  async findAll(): Promise<IPaymentMethods[]> {
    return this.paymentMethodsRepository.find();
  }

  async findOne(id: number): Promise<IPaymentMethods> {
    return this.paymentMethodsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.paymentMethodsRepository.delete({ id });
  }

  async create(
    paymentMethods: CreatePaymentMethodDto,
  ): Promise<IPaymentMethods | HttpException> {

    try{
      this.logger.info(`Criando Metodo de pagamento: ${paymentMethods.name}`, {
        service: PaymentMethodsService.name,
      });

      const result = await this.paymentMethodsRepository.save(paymentMethods);
      
      this.logger.info(
        `Metodo de pagamento ${paymentMethods.name} Criado com sucesso!`,
        {
          service: PaymentMethodsService.name,
        },
      );
      return result;
    }catch(err){
      this.logger.error(
        `Erro ao Criar Metodo de pagamento: ${paymentMethods.name}`,
        {
          service: PaymentMethodsService.name,
        },
      );
      return
    }
   

  }
}
