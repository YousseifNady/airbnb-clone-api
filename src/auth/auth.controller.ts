import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register.dto';
import { ResponseDto } from './dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto): Promise<ResponseDto> {
    return this.authService.register(body);
  }

  // @Post('login')
  // login(@Body() body: RegisterUserDto): Promise<ResponseDto> {
  //   return this.authService.login(body);
  // }

  // @Post('refresh-token')
  // refreshToken(@Body() body: RegisterUserDto): Promise<ResponseDto> {
  //   return this.authService.refreshToken(body);
  // }
}
