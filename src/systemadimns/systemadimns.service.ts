import { Injectable, OnModuleInit } from '@nestjs/common';
import { SystemAdmin } from './schema/system-admin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemadimnsService implements OnModuleInit {
    constructor(
        @InjectModel(SystemAdmin.name)
        private readonly systemAdminModel: Model<SystemAdmin>,
        private readonly configService: ConfigService
    ) { }

    onModuleInit() {
        this.initStstemAdmin();
    }

    async initStstemAdmin() {
        const systemAdminPassword = this.configService.getOrThrow<string>('SYSTEM_ADMIN_PASSWORD');
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
            is_super_admin: true
        });
    }
}
