import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenDto } from './dtos/refreh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto): Promise<ResponseDto> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto): Promise<ResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto): Promise<ResponseDto> {
    return this.authService.refreshToken(body);
  }
}
