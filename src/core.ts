import { RnContacts } from './helpers';
import type { Contact } from './types';

export const getAllContacts = async (): Promise<Contact[]> =>
  RnContacts.getAllContacts();
