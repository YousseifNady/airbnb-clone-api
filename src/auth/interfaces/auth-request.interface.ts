import { SystemAdminDto } from "../../systemadimns/dtos/system-admin.dto";
import { UserDto } from "../../users/dtos/user.dto";
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  principal: UserDto | SystemAdminDto;
}