import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

import { RoleName } from 'src/roles/entities/role.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import config from 'src/common/config';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany({ include: { role: true } });
    }

    findById(id: number) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
            include: { role: true }
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUniqueOrThrow({
            where: { email },
            include: { role: true }
        });
    }

    async create(myRole: RoleName, { role, ...user }: CreateUserDto) {
        switch (role) {
            case RoleName.ROOT:
                throw new ForbiddenException();
            case RoleName.ADMIN:
                if (myRole !== RoleName.ROOT) {
                    throw new UnauthorizedException();
                }
        }

        const hashedPassword = await bcrypt.hash(
            user.password,
            config.security.hash.rounds
        );

        return this.prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
                role: { connect: { name: role } }
            },
            include: { role: true }
        });
    }

    update(
        id: number,
        myRole: RoleName,
        isMe: boolean,
        { role, ...user }: UpdateUserDto
    ) {
        if (!isMe && myRole !== RoleName.ROOT) {
            throw new UnauthorizedException();
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                ...user,
                role: { connect: role ? { name: role } : undefined }
            },
            include: { role: true }
        });
    }

    remove(id: number, isMe: boolean, myRole: RoleName) {
        const user = this.prisma.user.findUnique({
            where: { id },
            include: { role: { select: { name: true } } }
        });

        if (!user) {
            throw new NotFoundException();
        }

        switch (user.role.name) {
            case RoleName.ROOT:
                throw new ForbiddenException();
            case RoleName.ADMIN:
                if (!isMe || myRole !== RoleName.ROOT) {
                    throw new UnauthorizedException();
                }
            case RoleName.USER:
                if (
                    !isMe ||
                    ![RoleName.ROOT, RoleName.ADMIN].includes(myRole)
                ) {
                    throw new UnauthorizedException();
                }
        }

        return this.prisma.user.delete({ where: { id } });
    }
}
