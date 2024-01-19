import { IsEmail, IsNotEmpty, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly surname: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsEmail()
  @MaxLength(320)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly country: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly city: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly zipCode: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly address: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly birthPlace: string;

  @IsNotEmpty()
  readonly birthDate: Date;

  @IsNotEmpty()
  @MaxLength(200)
  readonly fiscalCode: string;

  @IsNotEmpty()
  @MaxLength(200)
  readonly documentNumber: string;
}
