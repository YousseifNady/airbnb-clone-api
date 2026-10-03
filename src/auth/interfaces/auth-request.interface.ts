import { SystemAdminDto } from '../../system-admins/dtos/system-admins.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  principal: UserDto | SystemAdminDto;
}
