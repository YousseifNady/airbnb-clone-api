import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from '../interfaces/auth-request.interface';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../common/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const isPublic = this.reflector.getAllAndOverride<boolean>('is_public', [
      context.getHandler()
    ]);

    if(isPublic) return true;

    const principal = request.principal;

    const role = this.reflector.getAllAndOverride<string>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    return principal.role === role;
  }
}
