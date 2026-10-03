import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { LoginDto } from '../auth/dtos/login.dto';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { UserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(data: RegisterUserDto): Promise<UserDto> {
    const existingUser = await this.userModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new BadRequestException('Email already exists');
      }

      if (existingUser.phone === data.phone) {
        throw new BadRequestException('Phone number already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    return plainToInstance(UserDto, newUser.toObject());
  }

  async checkCredentials(data: LoginDto): Promise<UserDto> {
    const existingUser = await this.userModel.findOne({
      email: data.email,
    });

    if (!existingUser) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return plainToInstance(UserDto, existingUser.toObject());
  }

  async findById(id: string) {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    return plainToInstance(UserDto, existingUser.toObject());
  }
}
