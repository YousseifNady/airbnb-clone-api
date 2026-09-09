import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { StringValue } from 'ms';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenDto } from './dtos/refreh-token.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { RefreshToken } from './schemas/refresh-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async register(data: RegisterUserDto): Promise<ResponseDto> {
    const user = await this.usersService.create(data);

    return this.generateTokens(user._id.toString());
  }

  async login(data: LoginUserDto): Promise<ResponseDto> {
    const user = await this.usersService.checkCredentials(data);

    return this.generateTokens(user._id.toString());
  }

  async refreshToken(data: RefreshTokenDto): Promise<ResponseDto> {
    let payload: { userId: string; type?: string };

    try {
      payload = await this.jwtService.verifyAsync(data.refresh_token);
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new ForbiddenException('Invalid refresh token');
    }

    const refreshToken = await this.refreshTokenModel.findOne({
      userId: payload.userId,
    });

    if (!refreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      data.refresh_token,
      refreshToken.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return this.generateTokens(refreshToken.userId);
  }

  private async generateTokens(userId: string): Promise<ResponseDto> {
    return {
      accessToken: await this.generateAccessToken(userId),
      refreshToken: await this.generateRefreshToken(userId),
    };
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({ userId });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
        type: 'refresh',
      },
      {
        expiresIn: this.configService.getOrThrow<StringValue>(
          'JWT_REFRESH_TOKEN_EXPIRES_IN',
        ),
      },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.refreshTokenModel.create({
      userId,
      refreshToken: hashedRefreshToken,
    });

    return refreshToken;
  }
}
