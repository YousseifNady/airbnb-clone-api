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

import { CitiesService } from '../cities/cities.service';
import { CountriesService } from '../countries/countries.service';
import { UnitCategoriesService } from '../unit-categories/unit-categories.service';
import { AppSettingsService } from '../app-settings/app-settings.service';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<Unit>,
    private readonly unitPhotosService: UnitPhotosService,
    private readonly citiesService: CitiesService,
    private readonly countriesService: CountriesService,
    private readonly unitCategoriesService: UnitCategoriesService,
    private readonly appSettingsService: AppSettingsService,
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
    await this.validateUnit(data);

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

    return plainToInstance(UnitsDto, existingUnit.toObject());
  }

  async update(
    id: string,
    data: UpsertUnitsDto,
    photos: Express.Multer.File[],
  ): Promise<UnitsDto> {
    await this.validateUnit(data);

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

  private async validateUnit(body: UpsertUnitsDto): Promise<void> {
    const appSettings = await this.appSettingsService.findAll();
    if (appSettings && body?.cost_per_day < appSettings.min_price) {
      throw new BadRequestException(
        `Cost per day can not be less than min price: ${appSettings.min_price}`,
      );
    }

    if (body?.city_id) {
      const city = await this.citiesService.show(body.city_id);
      if (!city) throw new BadRequestException('City not found');
    }

    if (body?.country_id) {
      const country = await this.countriesService.show(body.country_id);
      if (!country) throw new BadRequestException('Country not found');
    }

    if (body?.unit_category_id) {
      const unitCategory = await this.unitCategoriesService.show(
        body.unit_category_id,
      );
      if (!unitCategory)
        throw new BadRequestException('Unit category not found');
    }
  }
}
