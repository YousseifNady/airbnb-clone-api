import { BadRequestException, Injectable } from '@nestjs/common';
import { Unit } from './schema/unit.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UnitsDto } from './dtos/units.dto';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { UnitsFilter } from './filters/units.filter';
import { Pagination } from '../common/helpers/pagination.helper';
import { plainToInstance } from 'class-transformer';
import { UpsertUnitsDto } from './dtos/upsert-units.dto';
import { UnitPhotosService } from './unit-photos.service';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<Unit>,
    private readonly unitPhotosService: UnitPhotosService,
  ) {}

  async findAll(data: FindAllUnitsDto) {
    const filter = UnitsFilter.build(data);

    const query = this.unitModel.find(filter);

    return new Pagination(query, UnitsDto, data.page, data.limit).get();
  }

  async store(
    data: UpsertUnitsDto,
    photos: Express.Multer.File[],
  ): Promise<UnitsDto> {
    const photoPaths = await this.unitPhotosService.upload(photos);

    try {
      const unit = await this.unitModel.create({
        ...data,
        photos: photoPaths,
      });

      return plainToInstance(UnitsDto, unit.toObject(), {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      await this.unitPhotosService.delete(photoPaths);

      throw error;
    }
  }

  async show(id: string): Promise<UnitsDto> {
    const existingUnit = await this.unitModel.findById(id);

    if (!existingUnit) {
      throw new BadRequestException('Unit Not Found');
    }

    return plainToInstance(UnitsDto, existingUnit);
  }

  async update(
    id: string,
    data: UpsertUnitsDto,
    photos: Express.Multer.File[],
  ): Promise<UnitsDto> {
    const existingUnit = await this.unitModel.findById(id);

    if (!existingUnit) {
      throw new BadRequestException('Unit Not Found');
    }

    const oldPhotoPaths = existingUnit.photos ?? [];

    const newPhotoPaths = await this.unitPhotosService.upload(photos);

    let unit;

    try {
      unit = await this.unitModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...data,
            photos: newPhotoPaths,
          },
        },
        {
          new: true,
        },
      );
    } catch (error) {
      await this.unitPhotosService.delete(newPhotoPaths);

      throw error;
    }

    if (!unit) {
      await this.unitPhotosService.delete(newPhotoPaths);

      throw new BadRequestException('Unit Not Found');
    }

    await this.unitPhotosService.delete(oldPhotoPaths);

    return plainToInstance(UnitsDto, unit.toObject(), {
      excludeExtraneousValues: true,
    });
  }

  async destroy(id: string): Promise<void> {
    const existingUnit = await this.unitModel.findById(id);

    if (!existingUnit) {
      throw new BadRequestException('Unit Not Found');
    }

    await this.unitModel.findByIdAndUpdate(id, {
      $set: {
        deleted_at: Date.now(),
      },
    });
  }
}
