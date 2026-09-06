import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { StringValue } from "ms";
import { RefreshToken } from "../schemas/refresh-token.schema";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import bcrypt from 'bcrypt';
import { ResponseDto } from "../dtos/response.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateTokensUseCase {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>
    ) {}

    async execute(userId: string): Promise<ResponseDto> {
        return {
            accessToken: await this.generateAccessToken(userId),
            refreshToken: await this.generateRefreshToken(userId)
        };
    }

    private async generateAccessToken(userId: string): Promise<string> {
        return await this.jwtService.signAsync({ userId });
    }

    private async generateRefreshToken(userId: string): Promise<string> {
        const refreshToken = await this.jwtService.signAsync(
            { userId, type: 'refresh' },
            { expiresIn: this.configService.getOrThrow<StringValue>('JWT_REFRESH_TOKEN_EXPIRES_IN') }
        );
    
        const hashedRefershToken = await bcrypt.hash(refreshToken, 10);
        
        const newRefreshToken = new this.refreshTokenModel({
            userId,
            refreshToken: hashedRefershToken,
        });

        await newRefreshToken.save();

        return refreshToken;
    }
}