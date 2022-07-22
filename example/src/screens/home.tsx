/* eslint-disable import/no-extraneous-dependencies */
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Contact, ContactError, getAllContacts } from 'rn-contacts';

import { ContactItem } from '../components/contact-item';
import { PermitType, usePermission } from '../core/permission/use-permission';

/**
 * Constants
 */

const FIRST_LETTER_INDEX = 0;

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitle: {
    color: '#333333',
    display: 'flex',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyList: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 24,
  },
});

/**
 * Home
 */

export const Home: FunctionComponent = () => {
  const [result, setResult] = useState<Contact[]>([]);
  const [error, setError] = useState<ContactError>();
  const {
    permissionGranted,
    checkPermission,
    requirePermission,
  } = usePermission(PermitType.CONTACTS);

  const fetchContacts = async (): Promise<void> => {
    try {
      const contacts = await getAllContacts();
      setResult(contacts);
    } catch (error) {
      setError(error as ContactError);
    }
  };

  const getNameInitial = useCallback(
    (firstName: string): string => firstName.charAt(FIRST_LETTER_INDEX),
    []
  );

  useEffect(() => {
    checkPermission();

    console.log('permissionGranted: ', permissionGranted);
    if (permissionGranted) {
      fetchContacts();
    } else {
      requirePermission();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionGranted]);

  return (
    <View style={styles.container}>
      {error && <Text>{error.message}</Text>}
      {!error && result && (
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <ContactItem
              contact={item}
              nameInitial={getNameInitial(item.firstName)}
            />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.listTitle}>Contacts</Text>
          )}
          stickyHeaderIndices={[0]}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>No contacts found!</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
