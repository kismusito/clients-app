import { PERMISSION } from "src/utils/enums/permissions";

export type Permission = {
  [key: string]: PERMISSION[];
};

export type LoginResponse = {
  token: string;
  message: string;
  permissions: Permission;
};
