import bcrypt from 'bcrypt';
import { BadRequestException } from "../../common/exceptions/bad-request.exception";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { UserDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";
import { LoginUserDto } from "../../auth/dtos/login-user.dto";
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckCredentialsUseCase {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}
    
    async execute(data: LoginUserDto): Promise<UserDto> {
        const existingUser = await this.userModel.findOne({
            email: data.email
        });

        if (!existingUser) {
            throw new BadRequestException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(data.password, existingUser.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid email or password');
        }

        return plainToClass(UserDto, existingUser);
    }
}