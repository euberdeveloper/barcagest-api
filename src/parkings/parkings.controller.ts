import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Put
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ReplaceParkingDto } from './dto/replace-parking.dto';
import { ParkingEntity } from './entities/parking.entity';

import { ParkingsService } from './parkings.service';
import { RoleName } from 'src/roles/entities/role.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('parkings')
@ApiTags('parkings')
export class ParkingsController {
    constructor(private readonly parkingsService: ParkingsService) {}

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all parkings' })
    @ApiOkResponse({ type: [ParkingEntity] })
    async findPublished(): Promise<ParkingEntity[]> {
        const parkings = await this.parkingsService.findAll();
        return parkings.map((parking) => new ParkingEntity(parking));
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Gets the parking with the specified id' })
    @ApiOkResponse({ type: ParkingEntity })
    async findOne(@Param('id') id: number): Promise<ParkingEntity> {
        return new ParkingEntity(await this.parkingsService.findOne(id));
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Creates a new parking' })
    @ApiCreatedResponse({ type: ParkingEntity })
    async create(
        @Body() createParkingDto: CreateParkingDto
    ): Promise<ParkingEntity> {
        return new ParkingEntity(
            await this.parkingsService.create(createParkingDto)
        );
    }

    @Put(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Replaces a parking' })
    @ApiOkResponse({ type: ParkingEntity })
    async replace(
        @Param('id') id: number,
        @Body() replaceParkingDto: ReplaceParkingDto
    ): Promise<ParkingEntity> {
        return new ParkingEntity(
            await this.parkingsService.replace(id, replaceParkingDto)
        );
    }

    @Patch(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Updates a parking' })
    @ApiOkResponse({ type: ParkingEntity })
    async update(
        @Param('id') id: number,
        @Body() updateParkingDto: UpdateParkingDto
    ): Promise<ParkingEntity> {
        return new ParkingEntity(
            await this.parkingsService.update(id, updateParkingDto)
        );
    }

    @Delete(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes a parking' })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.parkingsService.remove(id);
    }
}
