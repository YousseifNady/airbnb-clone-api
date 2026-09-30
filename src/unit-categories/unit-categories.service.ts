import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnitCategory } from './schema/unit-categories.schema';
import { Model } from 'mongoose';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { Pagination } from '../common/helpers/pagination.dto';
import { UnitCategoryDto } from './dtos/unit-categories.dto';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { UpsertUnitCategoriesDto } from './dtos/upsert-unit-categories.dto';
import { UnitCategoryFilter } from './filters/unit-categories.filter';

@Injectable()
export class UnitCategoriesService {
    constructor(
        @InjectModel(UnitCategory.name)
        private readonly unitCategoryModel: Model<UnitCategory>
    ) { }

    async findAll(data: FindAllUnitCategoriesDto) {
        const filter = UnitCategoryFilter.build(data);

        const query = this.unitCategoryModel.find(filter);

        return new Pagination(
            query,
            UnitCategoryDto,
            data.page,
            data.limit,
        ).get();
    }

    async store(data: UpsertUnitCategoriesDto): Promise<UnitCategoryDto> {
        const existingUnitCategory = await this.unitCategoryModel.findOne({
            name: data.name
        });

        if (existingUnitCategory) {
            throw new BadRequestException('UnitCategory Already Exists');
        }

        const newUnitCategory = await this.unitCategoryModel.create(data);

        return plainToInstance(UnitCategoryDto, newUnitCategory);
    }

    async show(id: string): Promise<UnitCategoryDto> {
        const existingUnitCategory = await this.unitCategoryModel.findById(id);

        if (!existingUnitCategory) {
            throw new BadRequestException('UnitCategory Not Found');
        }

        return plainToInstance(UnitCategoryDto, existingUnitCategory);
    }

    async update(id: string, data: UpsertUnitCategoriesDto): Promise<UnitCategoryDto> {
        const existingUnitCategory = await this.unitCategoryModel.findById(id);

        if (!existingUnitCategory) {
            throw new BadRequestException('UnitCategory Not Found');
        }

        const UnitCategory = await this.unitCategoryModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );

        return plainToInstance(UnitCategoryDto, UnitCategory);
    }

    async destroy(id: string): Promise<void> {
        const existingUnitCategory = await this.unitCategoryModel.findById(id);

        if (!existingUnitCategory) {
            throw new BadRequestException('UnitCategory Not Found');
        }

        await this.unitCategoryModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    deleted_at: Date.now()
                }
            },
        );
    }
}
