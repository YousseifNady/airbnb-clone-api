import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User phone number',
    example: '0120998088',
  })
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  password!: string;
}
