/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Contact, ContactError, getAllContacts } from 'rn-contacts';

import { PermitType, usePermission } from '../../hooks/use-permission';

/**
 * Types
 */

interface UseContactsHook {
  contacts?: Contact[];
  error?: string;
  loading: boolean;
  permissionGranted: boolean;
}

/**
 * useContacts
 */

export const useContacts = (): UseContactsHook => {
  const [contacts, setContacts] = useState<Contact[]>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    loading: loadingPermission,
    permissionGranted,
    checkPermission,
    requirePermission,
  } = usePermission(PermitType.CONTACTS);

  const fetchContacts = async (): Promise<void> => {
    try {
      setLoading(true);
      const contacts = await getAllContacts();
      setContacts(contacts);
    } catch (error) {
      setContacts([]);

      const contactsError = error as ContactError;
      setError(contactsError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPermission();

    setLoading(true);
    if (permissionGranted) {
      fetchContacts();
    } else {
      try {
        requirePermission();
      } finally {
        setContacts([]);
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionGranted, requirePermission]);

  return {
    contacts,
    error,
    loading: loading || loadingPermission,
    permissionGranted,
  };
};
