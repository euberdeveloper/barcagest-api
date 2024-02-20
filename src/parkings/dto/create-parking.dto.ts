import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateParkingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    vehicleType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    vehicleBrand: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    vehiclePlate: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    registrationYear: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    sizeInMeters: number;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: 'Time is ignored' })
    startDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        type: Date,
        description: 'Time is ignored'
    })
    endDate?: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        type: Date,
        description: 'Time is ignored'
    })
    checkIn?: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        type: Date,
        description: 'Time is ignored'
    })
    checkOut?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    contractNumber?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price?: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    customerId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notes?: string;
}
