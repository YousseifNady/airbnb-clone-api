import { UsersService } from "../../users/users.service";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { ResponseDto } from "../dtos/response.dto";
import { GenerateTokensUseCase } from "./generate-tokens.use-case";

export class RegisterUseCase {
  constructor(
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly userService: UsersService,
  ) {}
  
    async execute(data: RegisterUserDto): Promise<ResponseDto> {
        const user = await this.userService.create(data);
        return this.generateTokensUseCase.execute(user._id.toString());
    }
}