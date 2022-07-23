/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Platform } from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';
import type { PermitType } from './types';

const Permissions: Record<PermitType, Permission> = {
  CONTACTS: Platform.select({
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  })!,
};

const getPermissionByType = (permitType: PermitType): Permission =>
  Permissions[permitType];

export const getPermissionsStatus = async (
  permitType: PermitType
): Promise<PermissionStatus> => check(getPermissionByType(permitType));

export const isPermissionGranted = (
  permissionStatus: PermissionStatus
): boolean => permissionStatus === RESULTS.GRANTED;

export const isPermissionRequestable = (status: PermissionStatus): boolean =>
  status === RESULTS.DENIED;

export const requestPermission = (
  permitType: PermitType
): Promise<PermissionStatus> => request(getPermissionByType(permitType));

export const verifyPermission = async (
  permitType: PermitType
): Promise<PermissionStatus> => check(getPermissionByType(permitType));
