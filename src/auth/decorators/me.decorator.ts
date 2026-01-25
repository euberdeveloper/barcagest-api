import { SetMetadata } from '@nestjs/common';
import constants from '../../common/constants';

export type RolesCohesistance = 'roles' | 'me' | 'both' | 'either';

export const Me = (
    rolesCohesistance: RolesCohesistance = 'either',
    userIdParam = 'id'
) => SetMetadata(constants.decorators.me, { rolesCohesistance, userIdParam });
