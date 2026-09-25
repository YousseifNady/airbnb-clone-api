import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../../common/enums/role.enum';

export class LoginDto {
  @IsNotEmpty()
  @IsEnum(Roles)
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  role!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password!: string;
}
