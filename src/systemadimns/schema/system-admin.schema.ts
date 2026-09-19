import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';

@Schema({
    timestamps: true,
    collection: 'system_admins',
})
export class SystemAdmin {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({ default: false })
    is_super_admin!: boolean;
}

export const SystemAdminSchema = SchemaFactory.createForClass(SystemAdmin);

SystemAdminSchema.plugin(softDeletePlugin);
