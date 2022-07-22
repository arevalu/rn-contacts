/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import {
  check,
  request,
  Permission,
  PermissionStatus,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

/**
 * Types
 */

export enum PermitType {
  CONTACTS = 'CONTACTS',
}

interface UsePermissionProps {
  permitType: PermitType;
}

interface UsePermissionsHook {
  permissionGranted: boolean;
  checkPermission: () => Promise<boolean>;
  requirePermission: () => Promise<void>;
}

/**
 * usePermission hook
 */

const isPermissionRequestable = (status: PermissionStatus): boolean =>
  status === RESULTS.DENIED;

const Permissions: Record<PermitType, Permission> = {
  CONTACTS: Platform.select({
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  })!,
};

const getPermissionByType = (permitType: PermitType): Permission =>
  Permissions[permitType];

const getPermissionsStatus = async (
  permitType: PermitType
): Promise<PermissionStatus> => check(getPermissionByType(permitType));

export const usePermission = (permitType: PermitType): UsePermissionsHook => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const checkPermission = useCallback(
    async (): Promise<boolean> =>
      (await check(getPermissionByType(permitType))) === RESULTS.GRANTED,
    [permitType]
  );

  const requirePermission = useCallback(async () => {
    const permissionStatus = await getPermissionsStatus(permitType);
    const permissionRequestable = isPermissionRequestable(permissionStatus);
    console.log('permissionStatus: ', permissionStatus);
    console.log('permissionRequestable: ', permissionRequestable);

    if (!permissionGranted && permissionRequestable) {
      const requestResponse = await request(getPermissionByType(permitType));
      console.log('requestResponse: ', requestResponse);

      setPermissionGranted(requestResponse === RESULTS.GRANTED);
    }

    setPermissionGranted(permissionStatus === RESULTS.GRANTED);
    console.log('requirePermission >> permissionGranted: ', permissionGranted);
  }, [permitType, permissionGranted]);

  return {
    permissionGranted,
    checkPermission,
    requirePermission,
  };
};
