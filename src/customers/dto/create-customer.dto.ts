import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsEmail()
  @MaxLength(320)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly country: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly city: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly zipCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly address: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly birthPlace: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly fiscalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  readonly documentNumber: string;
}
