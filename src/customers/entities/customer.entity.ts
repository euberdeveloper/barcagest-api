import { ApiProperty } from '@nestjs/swagger';
import { Customer, IdentityType } from '@prisma/client';

export class CustomerEntity implements Customer {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty()
    birthPlace: string;

    @ApiProperty()
    residenceStreet: string;

    @ApiProperty()
    residenceZip: string;

    @ApiProperty()
    residenceCity: string;

    @ApiProperty()
    residenceCountry: string;

    @ApiProperty({ nullable: true, type: String })
    phoneNumber: string | null;

    @ApiProperty({ nullable: true, type: String })
    email: string | null;

    @ApiProperty({ nullable: true, type: String })
    ssn: string | null;

    @ApiProperty({ enum: IdentityType, enumName: 'IdentityType' })
    identityType: IdentityType;

    @ApiProperty()
    identityCity: string;

    @ApiProperty()
    identityIssuedAt: Date;

    @ApiProperty()
    identityCode: string;

    @ApiProperty({ nullable: true, type: String })
    notes: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(customer: Partial<CustomerEntity>) {
        Object.assign(this, customer);
    }
}
