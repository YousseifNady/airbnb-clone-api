import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedRequest } from "../interfaces/auth-request.interface";
import { IPrincipal } from "../interfaces/principal.interface";
import { Roles } from "../../common/enums/role.enum";

export const CurrentAuthenticated = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request) return null;

    return request.principal;
  },
);

export class Principal implements IPrincipal {
    constructor(
        public user: {
             _id: string;
              name: string;
              email: string;
          },
          public role: Roles
    ) {}
}