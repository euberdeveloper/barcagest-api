import { SetMetadata } from '@nestjs/common';
import constants from '../../common/constants';
import { RoleName } from '../../roles/entities/role.entity';

export const Roles = (...roles: RoleName[]) =>
    SetMetadata(constants.decorators.roles, roles);
