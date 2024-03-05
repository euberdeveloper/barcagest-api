import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ReplaceParkingDto } from './dto/replace-parking.dto';
import { QueryParamParkingDto } from './dto/query-param-parking.dto';
import { ParkingEntity } from './entities/parking.entity';

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

    private getNewContractNumber(
        parking: Pick<ParkingEntity, 'contractNumber' | 'endDate'>
    ): string {
        const contractNumberWithoutYear = parking.contractNumber.split('/')[0];
        const year = parking.endDate?.getFullYear() ?? new Date().getFullYear();
        const twoDigitsYear = (year + 1).toString().slice(-2);
        return `${contractNumberWithoutYear}/${twoDigitsYear}`;
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

    private getWhereFromEndDate(endDate: string) {
        const parts = endDate.split('-').map(Number);
        const year = parts[0];
        const month = parts[1];
        const minDate = new Date(Date.UTC(year, month ? month - 1 : 0, 1));
        const maxDate = new Date(Date.UTC(year, month ? month : 12, 1));
        return { endDate: { gte: minDate, lt: maxDate } };
    }

    findAll({ endDate }: QueryParamParkingDto) {
        return this.prisma.parking.findMany({
            where: endDate ? this.getWhereFromEndDate(endDate) : undefined,
            include: { customer: true }
        });
    }

    findById(id: number) {
        return this.prisma.parking.findUniqueOrThrow({
            where: { id },
            include: { customer: true }
        });
    }

    findByContractNumber(contractNumber: string) {
        return this.prisma.parking.findUniqueOrThrow({
            where: { contractNumber },
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
            contractNumber: this.getNewContractNumber(parking),
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

        await this.prisma.$transaction([
            this.prisma.parking.updateMany({
                where: this.getAnnualRenovalsWhere(),
                data: { isAnnual: false }
            }),
            this.prisma.parking.createMany({
                data: parkingsRenoved
            })
        ]);

        return this.prisma.parking.findMany({
            where: { id: { gt: maxId } },
            include: { customer: true }
        });
    }
}
