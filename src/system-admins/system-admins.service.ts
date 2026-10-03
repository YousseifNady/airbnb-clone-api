import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { SystemAdmin } from './schema/system-admins.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { SystemAdminDto } from './dtos/system-admins.dto';
import { LoginDto } from '../auth/dtos/login.dto';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    @InjectModel(SystemAdmin.name)
    private readonly systemAdminModel: Model<SystemAdmin>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.initSystemAdmin();
  }

  async initSystemAdmin() {
    const systemAdminPassword = this.configService.getOrThrow<string>(
      'SYSTEM_ADMIN_PASSWORD',
    );
    const hashedPassword = await bcrypt.hash(systemAdminPassword, 10);

    const email = this.configService.getOrThrow<string>('SYSTEM_ADMIN_EMAIL');

    const existsSystemAdmin = await this.systemAdminModel.findOne({ email });
    if (existsSystemAdmin) {
      return;
    }

    this.systemAdminModel.create({
      name: this.configService.getOrThrow<string>('SYSTEM_ADMIN_NAME'),
      email: email,
      password: hashedPassword,
      is_super_admin: true,
    });
  }

  async checkCredentials(data: LoginDto): Promise<SystemAdminDto> {
    const existingUser = await this.systemAdminModel.findOne({
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

    return plainToInstance(SystemAdminDto, existingUser.toObject());
  }

  async findById(id: string) {
    const existingSystemAdmin = await this.systemAdminModel.findById(id);

    if (!existingSystemAdmin) {
      throw new BadRequestException('System Admin not found');
    }

    return plainToInstance(SystemAdminDto, existingSystemAdmin.toObject());
  }
}
