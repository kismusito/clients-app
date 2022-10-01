import { Permission } from "src/modules/auth/responses/login.response";
import { MODULES } from "./enums/modules";
import { PERMISSION } from "./enums/permissions";

export const canAccess = (
  permissions: Permission,
  modules: MODULES,
  action: PERMISSION
): boolean => {
  if (permissions[modules] && permissions[modules]) {
    const getModule = permissions[modules].find((item) => item === action);
    if (getModule) {
      return true;
    }
  }

  return false;
};
