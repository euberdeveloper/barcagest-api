import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ReplaceParkingDto } from './dto/replace-parking.dto';

@Injectable()
export class ParkingsService {
    constructor(private prisma: PrismaService) {}

    private getYesterdayAtMidnight(): Date {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(23, 59, 59, 999);
        return yesterday;
    }
    private getLastDayOfTheYearAtMidnight(): Date {
        const lastDay = new Date(new Date().getFullYear(), 11, 31);
        lastDay.setHours(23, 59, 59, 999);
        return lastDay;
    }

    private getDayAfter(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        );
    }

    private getYearAfer(date: Date): Date {
        return new Date(
            date.getFullYear() + 1,
            date.getMonth(),
            date.getDate()
        );
    }

    private getAnnualRenovalsWhere() {
        return {
            isAnnual: true,
            startDate: { not: null },
            endDate: {
                not: null,
                gt: this.getYesterdayAtMidnight(),
                lte: this.getLastDayOfTheYearAtMidnight()
            }
        };
    }

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
            data: replaceParkingDto,
            include: { customer: true }
        });
    }

    update(id: number, updateParkingDto: UpdateParkingDto) {
        return this.prisma.parking.update({
            where: { id },
            data: updateParkingDto,
            include: { customer: true }
        });
    }

    remove(id: number) {
        return this.prisma.parking.delete({ where: { id } });
    }

    async findAnnualRenovals() {
        return this.prisma.parking.findMany({
            where: this.getAnnualRenovalsWhere(),
            include: { customer: true }
        });
    }

    async renoveAnnuals() {
        const parkingsToRenove = await this.prisma.parking.findMany({
            where: this.getAnnualRenovalsWhere()
        });
        const parkingsRenoved = parkingsToRenove.map((parking) => ({
            ...parking,
            startDate: this.getDayAfter(parking.endDate!),
            endDate: this.getYearAfer(parking.endDate!),
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined
        }));

        if (parkingsRenoved.length === 0) {
            return [];
        }

        const maxResult = await this.prisma.parking.findFirst({
            orderBy: { id: 'desc' },
            select: { id: true }
        });
        const maxId = maxResult!.id;

        const [updateResult, createResult] = await this.prisma.$transaction([
            this.prisma.parking.updateMany({
                where: this.getAnnualRenovalsWhere(),
                data: { isAnnual: false }
            }),
            this.prisma.parking.createMany({
                data: parkingsRenoved
            })
        ]);

        console.log({ updateResult, createResult });

        return this.prisma.parking.findMany({
            where: { id: { gt: maxId } },
            include: { customer: true }
        });
    }
}
