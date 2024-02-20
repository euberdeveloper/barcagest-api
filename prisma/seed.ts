import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
    const [rootRole, adminRole, userRole] = await Promise.all(
        rolesBodies.map((role) => prisma.role.upsert(role))
    );

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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
