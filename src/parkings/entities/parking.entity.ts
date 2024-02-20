import { ApiProperty } from '@nestjs/swagger';
import { Parking, Prisma } from '@prisma/client';
import { CustomerEntity } from 'src/customers/entities/customer.entity';

export class ParkingEntity implements Parking {
    @ApiProperty()
    id: number;

    @ApiProperty()
    vehicleType: string;

    @ApiProperty()
    vehicleBrand: string;

    @ApiProperty()
    vehiclePlate: string;

    @ApiProperty()
    registrationYear: number;

    @ApiProperty()
    sizeInMeters: number;

    @ApiProperty({ description: 'Time is ignored' })
    startDate: Date;

    @ApiProperty({ nullable: true, type: Date, description: 'Time is ignored' })
    endDate: Date | null;

    @ApiProperty({ nullable: true, type: Date, description: 'Time is ignored' })
    checkIn: Date | null;

    @ApiProperty({ nullable: true, type: Date, description: 'Time is ignored' })
    checkOut: Date | null;

    @ApiProperty({ nullable: true, type: String })
    contractNumber: string | null;

    @ApiProperty({
        nullable: true,
        type: Number,
        description: 'Price is in euros'
    })
    price: Prisma.Decimal | null;

    @ApiProperty({ nullable: true, type: String })
    notes: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    customerId: number;

    @ApiProperty()
    customer: CustomerEntity;

    constructor({ customer, ...parking }: Partial<ParkingEntity>) {
        Object.assign(this, parking);

        if (customer) {
            this.customer = new CustomerEntity(customer);
        }
    }
}
