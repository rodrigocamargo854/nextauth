import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllrole = roles?.some((role) => {
      return user.permissions.includes(role);
    });

    if (!hasAllrole) {
      return false;
    }
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });
  return userHasValidPermissions;
}
