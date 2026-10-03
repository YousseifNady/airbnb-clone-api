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
import { CitiesService } from './cities.service';
import { UpsertCitiesDto } from './dtos/upsert-cities.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';

@Controller('cities')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/')
  findAll(@Query() queryParams: FindAllCitiesDto) {
    return this.citiesService.findAll(queryParams);
  }

  @Post('/')
  store(@Body() data: UpsertCitiesDto) {
    return this.citiesService.store(data);
  }

  @Get('/:id')
  show(@Param() id: string) {
    return this.citiesService.show(id);
  }

  @Put('/:id')
  update(@Param() id: string, @Body() data: UpsertCitiesDto) {
    return this.citiesService.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() id: string) {
    return this.citiesService.destroy(id);
  }
}
