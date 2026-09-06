import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dtos/register.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}
    
    async create(data: RegisterUserDto): Promise<UserDto> {
        return await this.createUserUseCase.execute(data);
    }
}
