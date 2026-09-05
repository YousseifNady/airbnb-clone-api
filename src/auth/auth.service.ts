import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    register(data: RegisterUserDto) {

    }
}
