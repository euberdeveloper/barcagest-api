import { IsEmail, IsNotEmpty, MaxLength, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(320)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 16)
  readonly password: string;
}
