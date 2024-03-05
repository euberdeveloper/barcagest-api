import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addRoles() {
    type UpsertRoleArgs = Parameters<typeof prisma.role.upsert>[0];
    const rolesBodies: UpsertRoleArgs[] = [
        {
            where: { name: 'root' },
            update: {},
            create: { name: 'root' }
        },
        {
            where: { name: 'admin' },
            update: {},
            create: { name: 'admin' }
        },
        {
            where: { name: 'user' },
            update: {},
            create: { name: 'user' }
        }
    ];
    const roles = await Promise.all(
        rolesBodies.map((role) => prisma.role.upsert(role))
    );

    console.log('Seeded roles:');
    console.log(roles);

    return roles;
}

async function addUsers() {
    const [rootRole, adminRole] = await addRoles();

    type UpsertUserArgs = Parameters<typeof prisma.user.upsert>[0];
    const usersBodies: UpsertUserArgs[] = [
        {
            where: { email: 'euberdeveloper+barcagest@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+barcagest@gmail.com',
                fullname: 'Eugenio Berretta',
                password: 'password',
                roleId: rootRole.id
            }
        },
        {
            where: { email: 'euberdeveloper+barcagestadmin@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+barcagestadmin@gmail.com',
                fullname: 'Eubero Euberis',
                password: 'password',
                roleId: adminRole.id
            }
        }
    ];
    const users = await Promise.all(
        usersBodies.map((user) => prisma.user.upsert(user))
    );

    console.log('Seeded users:');
    console.log(users);

    return users;
}

async function addCustomers() {
    type UpsertCustomerArgs = Parameters<typeof prisma.customer.upsert>[0];
    const customersBodies: UpsertCustomerArgs[] = [
        {
            where: { identityCode: 'ABC123ABC' },
            update: {},
            create: {
                name: 'Eubero',
                surname: 'Euberis',
                birthDate: new Date('1990-01-01'),
                birthPlace: 'Rome',
                ssn: 'ABC',
                identityType: 'ID_CARD',
                identityCity: 'Valdagno',
                identityIssuedAt: new Date('2010-01-01'),
                identityCode: 'ABC123ABC',
                email: 'euberdeveloper+barcagest_customer1@gmail.com',
                phoneNumber: '+393331234567',
                residenceCity: 'Muenchen',
                residenceStreet: 'Musterstrasse',
                residenceZip: '12345',
                residenceCountry: 'Germany',
                notes: 'This is a note'
            }
        },
        {
            where: { identityCode: 'ABC123EFG' },
            update: {},
            create: {
                name: 'Eubero',
                surname: 'Euberis',
                birthDate: new Date('1995-01-01'),
                birthPlace: 'Rome',
                identityType: 'PASSPORT',
                identityCity: 'Valdagno',
                identityIssuedAt: new Date('2010-01-01'),
                identityCode: 'ABC123EFG',
                email: 'euberdeveloper+barcagest_customer2@gmail.com',
                residenceCity: 'Muenchen',
                residenceStreet: 'Musterstrasse',
                residenceZip: '12345',
                residenceCountry: 'Germany'
            }
        }
    ];

    const customers = await Promise.all(
        customersBodies.map((customer) => prisma.customer.upsert(customer))
    );

    console.log('Seeded customers:');
    console.log(customers);

    return customers;
}

async function addParkings() {
    const customers = await addCustomers();

    type CreateParkingArgs = Parameters<typeof prisma.parking.create>[0];
    type ParkingArgsPayload = CreateParkingArgs['data'];
    const parkingPayloads: ParkingArgsPayload[] = [
        {
            vehicleType: 'barca',
            vehicleBrand: 'Fiat',
            vehiclePlate: 'ABC123',
            registrationYear: 2020,
            sizeInMeters: 4.5,
            startDate: new Date('2021-01-01'),
            endDate: new Date('2022-01-01'),
            contractNumber: 'ABC123',
            isAnnual: true,
            price: 1000.25,
            customerId: customers[0].id
        },
        {
            vehicleType: 'motoscafo',
            vehicleBrand: 'Fiat',
            vehiclePlate: 'ABC123',
            registrationYear: 2020,
            sizeInMeters: 4.5,
            startDate: new Date('2021-01-01'),
            contractNumber: '001',
            isAnnual: false,
            customerId: customers[0].id
        },
        {
            vehicleType: 'motoscafo',
            vehicleBrand: 'Fiat',
            vehiclePlate: 'ABC456',
            registrationYear: 2020,
            sizeInMeters: 4.5,
            startDate: new Date('2021-01-01'),
            endDate: new Date('2022-01-01'),
            contractNumber: 'ABC456',
            isAnnual: true,
            price: 1000,
            customerId: customers[1].id
        }
    ];

    await Promise.all(
        parkingPayloads.map((parking) =>
            prisma.parking.deleteMany({
                where: { ...parking, customer: undefined, id: undefined }
            })
        )
    );
    const parkings = await Promise.all(
        parkingPayloads.map((parking) =>
            prisma.parking.create({ data: parking })
        )
    );

    console.log('Seeded parkings:');
    console.log(parkings);

    return parkings;
}

async function main() {
    await addUsers();
    await addParkings();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
