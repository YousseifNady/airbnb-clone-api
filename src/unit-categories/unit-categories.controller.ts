import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UnitCategoriesService } from './unit-categories.service';
import { Public } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { UpsertUnitCategoriesDto } from './dtos/upsert-unit-categories.dto';

@Controller('unit-categories')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @Get('/')
  @Public()
  findAll(@Query() queryParams: FindAllUnitCategoriesDto) {
    return this.unitCategoriesService.findAll(queryParams);
  }

  @Post('/')
  store(@Body() data: UpsertUnitCategoriesDto) {
    return this.unitCategoriesService.store(data);
  }

  @Get('/:id')
  show(@Param() id: string) {
    return this.unitCategoriesService.show(id);
  }

  @Put('/:id')
  update(@Param() id: string, @Body() data: UpsertUnitCategoriesDto) {
    return this.unitCategoriesService.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() id: string) {
    return this.unitCategoriesService.destroy(id);
  }
}
