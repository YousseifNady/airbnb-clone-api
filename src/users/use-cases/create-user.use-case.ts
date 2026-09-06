import { RegisterUserDto } from "../../auth/dtos/register-user.dto";
import bcrypt from 'bcrypt';
import { BadRequestException } from "../../common/exceptions/bad-request.exception";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { UserDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}
    
    async execute(data: RegisterUserDto): Promise<UserDto> {
        const existingUser = await this.userModel.findOne({
            $or: [
                { email: data.email },
                { phoneNumber: data.phone },
            ],
        });

        if (existingUser) {
            if (existingUser.email === data.email) {
                throw new BadRequestException('Email already exists');
            }

            if (existingUser.phone === data.phone) {
                throw new BadRequestException('Phone number already exists');
            }
        }

        const hashedPasswword = await this.hashPassword(data.password);

        const newUser = await this.userModel.create({
            ...data,
            password: hashedPasswword,
        });

        return plainToClass(UserDto, newUser);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}