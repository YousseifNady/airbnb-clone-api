import { Roles } from "../../common/enums/role.enum";

export interface IPrincipal {
  user: {
     _id: string;
      name: string;
      email: string;
  };
  role: Roles;
}