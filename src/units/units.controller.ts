import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UnitsService } from './units.service';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { UpsertUnitsDto } from './dtos/upsert-units.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UnitsDto } from './dtos/units.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('units')
export class UnitsController {
    constructor(
        private readonly unitsService: UnitsService
    ) {}

    @Get('/')
    async findAll(
        @Query() data: FindAllUnitsDto
    ) {
        return await this.unitsService.findAll(data);
    }

    @Post('/')
    @UseInterceptors(FilesInterceptor('photos'))
    async store(
        @Body() data: UpsertUnitsDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /^image\/(jpeg|png|jpg)$/,
                })
                .addMaxSizeValidator({ maxSize: 5242880 })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        photos: Array<Express.Multer.File>
    ): Promise<UnitsDto> {
        return await this.unitsService.store(data, photos);
    }

    @Get('/:id')
    async show(
        @Param('id', ParseObjectIdPipe) id: string 
    ): Promise<UnitsDto> {
        return await this.unitsService.show(id);
    }

    @Put('/:id')
    @UseInterceptors(FilesInterceptor('photos'))
    async update(
        @Param('id', ParseObjectIdPipe) id: string,

        @Body() data: UpsertUnitsDto,

        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /^image\/(jpeg|png|jpg)$/,
                })
                .addMaxSizeValidator({
                    maxSize: 5242880,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        photos: Array<Express.Multer.File>,
    ): Promise<UnitsDto> {
        return await this.unitsService.update(id, data, photos);
    }

    @Delete('/:id')
    async destroy(
        @Param('id', ParseObjectIdPipe) id: string 
    ): Promise<void> {
        return await this.unitsService.destroy(id);
    }
}
