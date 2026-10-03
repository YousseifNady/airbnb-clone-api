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
import { CurrenciesService } from './currencies.service';
import { UpsertCurrenciesDto } from './dtos/upsert-currencies.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';

@Controller('currencies')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('/')
  findAll(@Query() queryParams: FindAllCurrenciesDto) {
    return this.currenciesService.findAll(queryParams);
  }

  @Post('/')
  store(@Body() data: UpsertCurrenciesDto) {
    return this.currenciesService.store(data);
  }

  @Get('/:id')
  show(@Param() id: string) {
    return this.currenciesService.show(id);
  }

  @Put('/:id')
  update(@Param() id: string, @Body() data: UpsertCurrenciesDto) {
    return this.currenciesService.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() id: string) {
    return this.currenciesService.destroy(id);
  }
}
