import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Length,
  IsEnum
} from 'class-validator';
import { RoleType } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(320)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 16)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Object.values(RoleType))
  readonly role: RoleType;
}
