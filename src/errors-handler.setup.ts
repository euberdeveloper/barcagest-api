import { HttpStatus, INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

export function setupErrorsHandler(app: INestApplication): void {
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(
        new PrismaClientExceptionFilter(httpAdapter, {
            P2000: HttpStatus.BAD_REQUEST,
            P2002: HttpStatus.CONFLICT,
            P2003: HttpStatus.NOT_FOUND,
            P2025: HttpStatus.NOT_FOUND
        })
    );
}
