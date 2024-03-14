import { ApiProperty } from '@nestjs/swagger';
import { IdentityType } from '@prisma/client';
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
    @ApiProperty()
    birthPlace: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    residenceStreet: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    residenceZip: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    residenceCity: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    residenceCountry: string;

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

    @IsEnum(IdentityType)
    @IsDefined()
    @ApiProperty()
    identityType: IdentityType;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    identityCity: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    @ApiProperty({ description: 'Time is ignored', example: '1999-04-23' })
    identityIssuedAt: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    identityCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notes?: string;
}
