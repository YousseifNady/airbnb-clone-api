import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UsersService } from "../../users/users.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { ResponseDto } from "../dtos/response.dto";
import { GenerateTokensUseCase } from "./generate-tokens.use-case";

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly userService: UsersService,
  ) {}
  
    async execute(data: LoginUserDto): Promise<ResponseDto> {
        const user = await this.userService.checkCredentials(data);
        return this.generateTokensUseCase.execute(user._id.toString());
    }
}