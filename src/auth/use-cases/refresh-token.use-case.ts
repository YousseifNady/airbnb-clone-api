import { JwtService } from "@nestjs/jwt";
import { ForbiddenException } from "../../common/exceptions/forbidden.exception";
import { RefreshTokenDto } from "../dtos/refreh-token.dto";
import { ResponseDto } from "../dtos/response.dto";
import { GenerateTokensUseCase } from "./generate-tokens.use-case";
import { Model } from "mongoose";
import { RefreshToken } from "../schemas/refresh-token.schema";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}
  
    async execute(data: RefreshTokenDto): Promise<ResponseDto> {
      let payload;

      try {
        payload = await this.jwtService.verifyAsync(data.refresh_token);
      } catch {
        throw new ForbiddenException("Invalid refresh token");
      }

      if(payload.type !== "refresh") {
        throw new ForbiddenException("Invalid refresh token");
      }

      const refreshToken = await this.refreshTokenModel.findOne({ userId: payload.userId });

      if(!refreshToken) {
        throw new ForbiddenException("Invalid refresh token");
      }

      const isrefreshTokenValid = await bcrypt.compare(data.refresh_token, refreshToken.refreshToken);
      
      if (!isrefreshTokenValid) {
          throw new ForbiddenException('Invalid refresh token');
      }
    
      return this.generateTokensUseCase.execute(refreshToken.userId);
    }
}