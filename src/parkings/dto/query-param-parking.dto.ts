import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class QueryParamParkingDto {
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}$/)
    @ApiProperty({
        required: false,
        type: String,
        description:
            'Filters the parkings that end in the specified year and month. The format must be YYYY-MM.'
    })
    endDate?: string;
}
