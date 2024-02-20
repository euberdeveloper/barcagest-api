import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ReplaceParkingDto } from './dto/replace-parking.dto';

@Injectable()
export class ParkingsService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.parking.findMany({
            include: { customer: true }
        });
    }

    findOne(id: number) {
        return this.prisma.parking.findUniqueOrThrow({
            where: { id },
            include: { customer: true }
        });
    }

    create(createParkingDto: CreateParkingDto) {
        return this.prisma.parking.create({
            data: createParkingDto,
            include: { customer: true }
        });
    }

    replace(id: number, replaceParkingDto: ReplaceParkingDto) {
        return this.prisma.parking.update({
            where: { id },
            data: replaceParkingDto
        });
    }

    update(id: number, updateParkingDto: UpdateParkingDto) {
        return this.prisma.parking.update({
            where: { id },
            data: updateParkingDto
        });
    }

    remove(id: number) {
        return this.prisma.parking.delete({ where: { id } });
    }
}
