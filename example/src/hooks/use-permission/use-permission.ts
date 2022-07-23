import { useCallback, useState } from 'react';

import {
  getPermissionsStatus,
  isPermissionGranted,
  isPermissionRequestable,
  requestPermission,
  verifyPermission,
} from './helpers';
import type { PermitType } from './types';

/**
 * Types
 */

interface UsePermissionsHook {
  loading: boolean;
  permissionGranted: boolean;
  checkPermission: () => Promise<boolean>;
  requirePermission: () => Promise<void>;
}

/**
 * usePermission hook
 */

export const usePermission = (permitType: PermitType): UsePermissionsHook => {
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    const checkPermissionResponse = await verifyPermission(permitType);

    if (checkPermissionResponse) {
      setLoading(false);
    }

    return isPermissionGranted(checkPermissionResponse);
  }, [permitType]);

  const requirePermission = useCallback(async () => {
    const permissionStatus = await getPermissionsStatus(permitType);
    const permissionRequestable = isPermissionRequestable(permissionStatus);

    if (!permissionGranted && permissionRequestable) {
      setLoading(true);
      const requestResponse = await requestPermission(permitType);
      if (requestResponse) {
        setLoading(false);
      }

      setPermissionGranted(isPermissionGranted(requestResponse));
    }

    setPermissionGranted(isPermissionGranted(permissionStatus));
  }, [permitType, permissionGranted]);

  return {
    loading,
    permissionGranted,
    checkPermission,
    requirePermission,
  };
};
