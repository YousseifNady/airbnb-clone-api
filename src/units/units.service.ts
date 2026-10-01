import { BadRequestException, Injectable } from '@nestjs/common';
import { Unit } from './schema/unit-categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UnitsDto } from './dtos/units.dto';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { UnitsFilter } from './filters/units.filter';
import { Pagination } from '../common/helpers/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { UpsertUnitsDto } from './dtos/upsert-units.dto';

@Injectable()
export class UnitsService {
    constructor(
        @InjectModel(Unit.name)
        private readonly unitModel: Model<Unit>
    ) {}

    async findAll(data: FindAllUnitsDto) {
        const filter = UnitsFilter.build(data);

        const query = this.unitModel.find(filter);

        return new Pagination(
            query,
            UnitsDto,
            data.page,
            data.limit,
        ).get();
    }
    
    async store(data: UpsertUnitsDto, photos: Express.Multer.File[]): Promise<UnitsDto> {
        const existingUnit = await this.unitModel.findOne({
            title: data.title
        });

        if (existingUnit) {
            throw new BadRequestException('Unit Already Exists');
        }

        const newUnit = await this.unitModel.create(data);

        return plainToInstance(UnitsDto, newUnit);
    }

    async show(id: string): Promise<UnitsDto> {
        const existingUnit = await this.unitModel.findById(id);

        if (!existingUnit) {
            throw new BadRequestException('Unit Not Found');
        }

        return plainToInstance(UnitsDto, existingUnit);
    }

    async update(id: string, data: UpsertUnitsDto): Promise<UnitsDto> {
        const existingUnit = await this.unitModel.findById(id);

        if (!existingUnit) {
            throw new BadRequestException('Unit Not Found');
        }

        const UnitCategory = await this.unitModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );

        return plainToInstance(UnitsDto, UnitCategory);
    }
    
    async destroy(id: string): Promise<void> {
        const existingUnit = await this.unitModel.findById(id);

        if (!existingUnit) {
            throw new BadRequestException('Unit Not Found');
        }

        await this.unitModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    deleted_at: Date.now()
                }
            },
        );
    }
}
