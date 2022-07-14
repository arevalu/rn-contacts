export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
}

export enum DomainError {
  ERROR_FAILED_REQUEST = 'error-failed-request',
  ERROR_ACCESS_DENIED = 'error-access-denied',
}

export interface ContactError {
  code: number;
  message: string;
  domain: DomainError;
}
