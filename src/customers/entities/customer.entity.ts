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

    @ApiProperty({ nullable: true, type: String })
    birthPlace: string | null;

    @ApiProperty({ nullable: true, type: String })
    residenceStreet: string | null;

    @ApiProperty({ nullable: true, type: String })
    residenceZip: string | null;

    @ApiProperty({ nullable: true, type: String })
    residenceCity: string | null;

    @ApiProperty({ nullable: true, type: String })
    residenceCountry: string | null;

    @ApiProperty({ nullable: true, type: String })
    phoneNumber: string | null;

    @ApiProperty({ nullable: true, type: String })
    email: string | null;

    @ApiProperty({ nullable: true, type: String })
    ssn: string | null;

    @ApiProperty({ nullable: true, type: String })
    idCardCode: string | null;

    @ApiProperty({ nullable: true, type: String })
    notes: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(customer: CustomerEntity) {
        Object.assign(this, customer);
    }
}
