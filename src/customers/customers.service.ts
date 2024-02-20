import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ReplaceCustomerDto } from './dto/replace-customer.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.customer.findMany();
    }

  
    findOne(id: number) {
        return this.prisma.customer.findUniqueOrThrow({
            where: { id }
        });
    }

    create(
        createCustomerDto: CreateCustomerDto,
        
    ) {
        return this.prisma.customer.create({
            data: createCustomerDto
        });
    }

    replace(
        id: number,
        replaceCustomerDto: ReplaceCustomerDto,
        
    ) {
        return this.prisma.customer.update({
            where: { id },
            data: replaceCustomerDto
        });
    }

    update(
        id: number,
        updateCustomerDto: UpdateCustomerDto,
        
    ) {
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto
        });
    }

    remove(id: number) {
        return this.prisma.customer.delete({ where: { id } });
    }
}
