import { SetMetadata } from '@nestjs/common';
import constants from '../../common/constants';

export const Public = () => SetMetadata(constants.decorators.public, true);
