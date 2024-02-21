import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ReplaceCustomerDto } from './dto/replace-customer.dto';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.customer.findMany();
    }

    findById(id: number) {
        return this.prisma.customer.findUniqueOrThrow({
            where: { id }
        });
    }

    findByIdCode(identificationCode: string) {
        return this.prisma.customer.findUniqueOrThrow({
            where: { identificationCode }
        });
    }

    create(createCustomerDto: CreateCustomerDto) {
        return this.prisma.customer.create({
            data: createCustomerDto
        });
    }

    replaceById(id: number, replaceCustomerDto: ReplaceCustomerDto) {
        return this.prisma.customer.update({
            where: { id },
            data: replaceCustomerDto
        });
    }

    replaceByIdCode(
        identificationCode: string,
        replaceCustomerDto: ReplaceCustomerDto
    ) {
        return this.prisma.customer.update({
            where: { identificationCode },
            data: replaceCustomerDto
        });
    }

    updateById(id: number, updateCustomerDto: UpdateCustomerDto) {
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto
        });
    }

    updateByIdCode(
        identificationCode: string,
        updateCustomerDto: UpdateCustomerDto
    ) {
        return this.prisma.customer.update({
            where: { identificationCode },
            data: updateCustomerDto
        });
    }

    removeById(id: number) {
        return this.prisma.customer.delete({ where: { id } });
    }

    removeByIdCode(identificationCode: string) {
        return this.prisma.customer.delete({ where: { identificationCode } });
    }
}
