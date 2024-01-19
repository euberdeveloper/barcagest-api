import { Module } from '@nestjs/common';
import { CustomersModule } from './customers.module';
import { CustomersController } from './customers.controller';

@Module({
  imports: [CustomersModule],
  controllers: [CustomersController]
})
export class HttpCustomersModule {}
