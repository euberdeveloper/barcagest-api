import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsOptional } from 'class-validator';

export class QueryParamCustomersDto {
    @IsOptional()
    @Equals('parkings')
    @ApiProperty({
        required: false,
        enum: ['parkings'],
        description:
            'The list of nested resources that will be embedded in the result.'
    })
    embed: 'parkings';
}
