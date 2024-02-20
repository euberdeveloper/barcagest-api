import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    @ApiProperty()
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

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    idCardCode?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    notes?: string;
}
