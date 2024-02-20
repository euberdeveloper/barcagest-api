import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty({ nullable: true })
    birthPlace: string | null;

    @ApiProperty({ nullable: true })
    residenceStreet: string | null;

    @ApiProperty({ nullable: true })
    residenceZip: string | null;

    @ApiProperty({ nullable: true })
    residenceCity: string | null;

    @ApiProperty({ nullable: true })
    residenceCountry: string | null;

    @ApiProperty({ nullable: true })
    phoneNumber: string | null;

    @ApiProperty({ nullable: true })
    email: string | null;

    @ApiProperty({ nullable: true })
    ssn: string | null;

    @ApiProperty({ nullable: true })
    idCardCode: string | null;

    @ApiProperty({ nullable: true })
    notes: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(customer: Customer) {
        Object.assign(this, customer);
    }
}
