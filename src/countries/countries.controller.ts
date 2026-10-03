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
import { CountriesService } from './countries.service';
import { UpsertCountriesDto } from './dtos/upsert-countries.dto';
import { FindAllCountriesDto } from './dtos/find-all-countries.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('countries')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/')
  @Public()
  findAll(@Query() queryParams: FindAllCountriesDto) {
    return this.countriesService.findAll(queryParams);
  }

  @Post('/')
  store(@Body() data: UpsertCountriesDto) {
    return this.countriesService.store(data);
  }

  @Get('/:id')
  show(@Param() id: string) {
    return this.countriesService.show(id);
  }

  @Put('/:id')
  update(@Param() id: string, @Body() data: UpsertCountriesDto) {
    return this.countriesService.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() id: string) {
    return this.countriesService.destroy(id);
  }
}
