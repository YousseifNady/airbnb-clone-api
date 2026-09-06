import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dtos/register.dto';
import { ResponseDto } from './dtos/response.dto';
import { GenerateAccessTokenUseCase } from './use-cases/generate-access-token.use-case';
import { GenerateRefreshTokenUseCase } from './use-cases/generate-refresh-token.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
    private readonly userService: UsersService,
  ) {}

  async register(data: RegisterUserDto): Promise<ResponseDto> {
    const user = await this.userService.create(data);

    const accessToken = await this.generateAccessTokenUseCase.execute(user._id.toString());
    const refreshToken = await this.generateRefreshTokenUseCase.execute(user._id.toString());

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
