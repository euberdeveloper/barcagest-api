import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsDefined,
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
    @IsOptional()
    @ApiProperty({
        required: false,
        type: Date,
        description: 'Time is ignored'
    })
    startDate?: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsOptional()
    @ApiProperty({
        required: false,
        type: Date,
        description: 'Time is ignored'
    })
    endDate?: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    contractNumber: string;

    @IsBoolean()
    @IsDefined()
    @ApiProperty()
    isAnnual: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    price?: number;

    @IsNumber()
    @IsDefined()
    @ApiProperty()
    customerId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notes?: string;
}
