import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { StringValue } from 'ms';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dtos/refreh-token.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ResponseDto } from './dtos/response.dto';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { RefreshToken } from './schemas/refresh-token.schema';
import { LoginDto } from './dtos/login.dto';
import { Roles } from '../common/enums/role.enum';
import { SystemAdimnsService } from '../system-adimns/system-adimns.service';
import { UnAuthorizedException } from '../common/exceptions/unauthorized.exception';
import { UserDto } from '../users/dtos/user.dto';
import { SystemAdminDto } from '../system-adimns/dtos/system-admins.dto';
import { AuthenticatedRequest } from './interfaces/auth-request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly systemAdminService: SystemAdimnsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async register(data: RegisterUserDto): Promise<ResponseDto> {
    const user = await this.usersService.create(data);

    return this.generateTokens(Roles.USER, user._id.toString());
  }

  async login(data: LoginDto): Promise<ResponseDto> {
    let principal;

    if (data.role == Roles.SYSTEM_ADMIN) {
      principal = await this.systemAdminService.checkCredentials(data);
    } else {
      principal = await this.usersService.checkCredentials(data);
    }

    return this.generateTokens(data.role, principal._id.toString());
  }

  async refreshToken(data: RefreshTokenDto): Promise<ResponseDto> {
    let payload: { role: string; principalId: string; type?: string };

    try {
      payload = await this.jwtService.verifyAsync(data.refresh_token);
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new ForbiddenException('Invalid refresh token');
    }

    const refreshToken = await this.refreshTokenModel.findOne({
      principalId: payload.principalId,
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

    return this.generateTokens(payload.role, refreshToken.principalId);
  }

  private async generateTokens(
    role: string,
    principalId: string,
  ): Promise<ResponseDto> {
    return {
      accessToken: await this.generateAccessToken(role, principalId),
      refreshToken: await this.generateRefreshToken(role, principalId),
    };
  }

  private async generateAccessToken(
    role: string,
    principalId: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { principalId, role },
      {
        expiresIn: this.configService.getOrThrow<StringValue>(
          'JWT_ACCESS_TOKEN_EXPIRES_IN',
        ),
      },
    );
  }

  private async generateRefreshToken(
    role: string,
    principalId: string,
  ): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        principalId,
        role,
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
      principalId,
      role,
      refreshToken: hashedRefreshToken,
    });

    return refreshToken;
  }

  public async injectPrincipalIntoRequest(
    request: AuthenticatedRequest,
  ): Promise<void> {
    const bearerToken = request.headers.authorization?.split(' ')[1];

    if (!bearerToken) {
      throw new UnAuthorizedException('unauthorized');
    }

    try {
      const { role, principalId } = await this.jwtService.verify(bearerToken);

      let injectData: UserDto | SystemAdminDto;

      if (role == Roles.USER) {
        injectData = await this.usersService.findById(principalId);
      } else {
        injectData = await this.systemAdminService.findById(principalId);
      }

      request.principal = injectData;
    } catch (e) {
      throw new UnAuthorizedException('unauthorized');
    }
  }
}
