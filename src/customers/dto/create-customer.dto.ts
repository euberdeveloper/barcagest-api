import { ApiProperty } from '@nestjs/swagger';
import { IdentificationType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    surname: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    @ApiProperty({ description: 'Time is ignored', example: '1999-04-23' })
    birthDate: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    birthPlace?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    residenceStreet?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    residenceZip?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    residenceCity?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    residenceCountry?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    ssn?: string;

    @IsEnum(IdentificationType)
    @IsDefined()
    @ApiProperty()
    identificationType: IdentificationType;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    identificationCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notes?: string;
}
