import { useCallback, useState } from 'react';
import type { PermissionStatus } from 'react-native-permissions';

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
  permissionGranted: boolean | undefined;
  checkPermission: () => Promise<boolean>;
  requirePermission: () => Promise<void>;
}

/**
 * usePermission hook
 */

export const usePermission = (permitType: PermitType): UsePermissionsHook => {
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean>();

  const checkPermission = useCallback(async (): Promise<boolean> => {
    setLoading(true);

    let checkPermissionResponse: PermissionStatus | undefined;

    try {
      checkPermissionResponse = await verifyPermission(permitType);
    } finally {
      setLoading(false);
    }

    return isPermissionGranted(checkPermissionResponse);
  }, [permitType]);

  const requirePermission = useCallback(async () => {
    const permissionStatus = await getPermissionsStatus(permitType);
    const permissionRequestable = isPermissionRequestable(permissionStatus);

    let requestResponse: PermissionStatus | undefined;

    if (!permissionGranted && permissionRequestable) {
      setLoading(true);

      try {
        requestResponse = await requestPermission(permitType);
      } finally {
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
