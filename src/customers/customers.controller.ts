import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customersService.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return customer;
  }

  @Post()
  create(@Body() body: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(body);
  }

  @Put(':id')
  async replace(
    @Param('id') id: number,
    @Body() body: CreateCustomerDto
  ): Promise<void> {
    const updated = await this.customersService.update(id, body);

    if (!updated) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateCustomerDto
  ): Promise<void> {
    const updated = await this.customersService.update(id, body);

    if (!updated) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.customersService.remove(id);
  }
}
