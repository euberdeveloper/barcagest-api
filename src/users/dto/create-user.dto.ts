import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Length,
  IsEnum
} from 'class-validator';
import { RoleType } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(320)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 16)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(RoleType))
  readonly role: RoleType;
}
