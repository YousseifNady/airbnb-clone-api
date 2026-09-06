import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { StringValue } from "ms";
import bcrypt from 'bcrypt';
import { RefreshToken } from "../schemas/refresh-token.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class GenerateRefreshTokenUseCase {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>
    ) {}

    async execute(userId: string): Promise<string> {
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