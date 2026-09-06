import { JwtService } from "@nestjs/jwt";

export class GenerateAccessTokenUseCase {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async execute(userId: string): Promise<string> {
        return await this.jwtService.signAsync({ userId });
    }
}