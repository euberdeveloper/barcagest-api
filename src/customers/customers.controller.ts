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
    async findPublished(): Promise<CustomerEntity[]> {
        const customers = await this.customersService.findAll();
        return customers.map((customer) => new CustomerEntity(customer));
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Gets the customer with the specified id' })
    @ApiOkResponse({ type: CustomerEntity })
    async findById(@Param('id') id: number): Promise<CustomerEntity> {
        return new CustomerEntity(await this.customersService.findById(id));
    }

    @Get('identity-code/:identityCode')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Gets the customer with the specified identity code'
    })
    @ApiOkResponse({ type: CustomerEntity })
    async findByIdentificationCode(
        @Param('identityCode') identityCode: string
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.findByIdentityCode(identityCode)
        );
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Creates a new customer' })
    @ApiCreatedResponse({ type: CustomerEntity })
    async create(
        @Body() createCustomerDto: CreateCustomerDto
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
        @Body() replaceCustomerDto: ReplaceCustomerDto
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.replaceById(id, replaceCustomerDto)
        );
    }

    @Put('identity-code/:identityCode')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Replaces a customer by the specified identity code'
    })
    @ApiOkResponse({ type: CustomerEntity })
    async replaceByIdentificationCode(
        @Param('identityCode') identityCode: string,
        @Body() replaceCustomerDto: ReplaceCustomerDto
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.replaceByIdentityCode(
                identityCode,
                replaceCustomerDto
            )
        );
    }

    @Patch(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Updates a customer' })
    @ApiOkResponse({ type: CustomerEntity })
    async update(
        @Param('id') id: number,
        @Body() updateCustomerDto: UpdateCustomerDto
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.updateById(id, updateCustomerDto)
        );
    }

    @Patch('identity-code/:identityCode')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Updates a customer by the specified identity code'
    })
    @ApiOkResponse({ type: CustomerEntity })
    async updateByIdentificationCode(
        @Param('identityCode') identityCode: string,
        @Body() updateCustomerDto: UpdateCustomerDto
    ): Promise<CustomerEntity> {
        return new CustomerEntity(
            await this.customersService.updateByIdentityCode(
                identityCode,
                updateCustomerDto
            )
        );
    }

    @Delete(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes a customer' })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.customersService.removeById(id);
    }

    @Delete('identity-code/:identityCode')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Removes a customer by the specified identity code'
    })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeByIdentificationCode(
        @Param('identityCode') identityCode: string
    ): Promise<void> {
        await this.customersService.removeByIdentityCode(identityCode);
    }
}
