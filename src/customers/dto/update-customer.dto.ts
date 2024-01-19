import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsPhoneNumber,
  IsOptional
} from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly surname?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly country?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly city?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly zipCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly address?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly birthPlace: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  readonly birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly fiscalCode: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly documentNumber: string;
}
