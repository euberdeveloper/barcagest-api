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
    Put,
    Query
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ReplaceCustomerDto } from './dto/replace-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

import { CustomersService } from './customers.service';
import { RoleName } from 'src/roles/entities/role.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all customers' })
    @ApiOkResponse({ type: [CustomerEntity] })
    async findPublished(
        
    ): Promise<CustomerEntity[]> {
        const customers = await this.customersService.findAll();
        return customers.map((customer) => new CustomerEntity(customer));
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Gets the customer with the specified id' })
    @ApiOkResponse({ type: CustomerEntity })
    async findOne(
        @Param('id') id: number,
        
    ): Promise<CustomerEntity> {
        return new CustomerEntity(await this.customersService.findOne(id));
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Creates a new customer' })
    @ApiCreatedResponse({ type: CustomerEntity })
    async create(
        @Body() createCustomerDto: CreateCustomerDto,
        
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.create(createCustomerDto)
        );
    }

    @Put(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Replaces a customer' })
    @ApiOkResponse({ type: CustomerEntity })
    async replace(
        @Param('id') id: number,
        @Body() replaceCustomerDto: ReplaceCustomerDto,
        
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.replace(id, replaceCustomerDto)
        );
    }

    @Patch(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Updates a customer' })
    @ApiOkResponse({ type: CustomerEntity })
    async update(
        @Param('id') id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
        
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.update(id, updateCustomerDto)
        );
    }

    @Delete(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes a customer' })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.customersService.remove(id);
    }
}
