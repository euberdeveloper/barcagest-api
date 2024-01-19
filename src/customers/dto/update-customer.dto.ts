import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsPhoneNumber,
  IsOptional
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly surname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  readonly email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly country?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly city?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly zipCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly address?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly birthPlace: string;

  @IsOptional()
  @IsNotEmpty()
  readonly birthDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly fiscalCode: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(200)
  readonly documentNumber: string;
}
