import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenDto } from './dtos/refreh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterSwagger } from './decorators/swagger/register.swagger.decorator';
import { LoginSwagger } from './decorators/swagger/login.swagger.decorator';
import { RefreshTokenSwagger } from './decorators/swagger/refresh-token.swagger.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @RegisterSwagger()
  register(@Body() body: RegisterUserDto): Promise<ResponseDto> {
    return this.authService.register(body);
  }

  @Post('login')
  @LoginSwagger()
  login(@Body() body: LoginUserDto): Promise<ResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @RefreshTokenSwagger()
  refreshToken(@Body() body: RefreshTokenDto): Promise<ResponseDto> {
    return this.authService.refreshToken(body);
  }
}
