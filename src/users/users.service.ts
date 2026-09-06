import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from '../auth/dtos/login-user.dto';
import { CheckCredentialsUseCase } from './use-cases/check-credentials.use-case';

@Injectable()
export class UsersService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly checkCredentialsUseCase: CheckCredentialsUseCase
    ) {}
    
    async create(data: RegisterUserDto): Promise<UserDto> {
        return await this.createUserUseCase.execute(data);
    }

    async checkCredentials(data: LoginUserDto): Promise<UserDto> {
        return this.checkCredentialsUseCase.execute(data);
    }
}
