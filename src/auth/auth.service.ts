import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenDto } from './dtos/refreh-token.dto';
import { RegisterUseCase } from './use-cases/register.use-case';
import { LoginUseCase } from './use-cases/login.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshTokenUseCase
  ) {}

  async register(data: RegisterUserDto): Promise<ResponseDto> {
    return this.registerUseCase.execute(data);
  }

  async login(data: LoginUserDto): Promise<ResponseDto> {
    return this.loginUseCase.execute(data);
  }

  refreshToken(data: RefreshTokenDto): Promise<ResponseDto> {
    return this.refreshUseCase.execute(data);
  }
}
