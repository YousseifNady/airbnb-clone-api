import { SetMetadata } from "@nestjs/common";
import { Roles } from "../../common/enums/role.enum";

export const Role = (role: Roles) => SetMetadata('role', role)