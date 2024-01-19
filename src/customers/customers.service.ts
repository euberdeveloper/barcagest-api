import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async create(customer: CreateCustomerDto) {
    return this.customerRepository.save(customer);
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    return this.customerRepository.findOne({ where: { id } });
  }

  async update(id: number, customer: UpdateCustomerDto): Promise<boolean> {
    const { affected } = await this.customerRepository.update(id, customer);
    return !!affected;
  }

  async remove(id: number) {
    await this.customerRepository.delete(id);
  }
}
