import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ReplaceCustomerDto } from './dto/replace-customer.dto';
import { QueryParamCustomersDto } from './dto/query-param-customer.dto';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    findAll(query: QueryParamCustomersDto) {
        return this.prisma.customer.findMany({
            include: query.embed === 'parkings' ? { parkings: true } : undefined
        });
    }

    findById(id: number) {
        return this.prisma.customer.findUniqueOrThrow({
            where: { id }
        });
    }

    findByIdentityCode(identityCode: string) {
        return this.prisma.customer.findUniqueOrThrow({
            where: { identityCode }
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

    replaceByIdentityCode(
        identityCode: string,
        replaceCustomerDto: ReplaceCustomerDto
    ) {
        return this.prisma.customer.update({
            where: { identityCode },
            data: replaceCustomerDto
        });
    }

    updateById(id: number, updateCustomerDto: UpdateCustomerDto) {
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto
        });
    }

    updateByIdentityCode(
        identityCode: string,
        updateCustomerDto: UpdateCustomerDto
    ) {
        return this.prisma.customer.update({
            where: { identityCode },
            data: updateCustomerDto
        });
    }

    removeById(id: number) {
        return this.prisma.customer.delete({ where: { id } });
    }

    removeByIdentityCode(identityCode: string) {
        return this.prisma.customer.delete({ where: { identityCode } });
    }
}
