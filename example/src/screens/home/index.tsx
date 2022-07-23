import React, { FunctionComponent, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { ContactItem } from '../../components/contact-item';
import { styles } from './styles';
import { useContacts } from './use-contacts';

/**
 * Constants
 */

const FIRST_LETTER_INDEX = 0;

/**
 * Home
 */

export const Home: FunctionComponent = () => {
  const { contacts, error, loading, permissionGranted } = useContacts();

  const getNameInitial = useCallback(
    (firstName: string): string => firstName.charAt(FIRST_LETTER_INDEX),
    []
  );

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      {loading && !!contacts && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!error && !loading && contacts !== undefined && (
        <>
          <Text style={styles.listTitle}>Contacts</Text>
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
              <ContactItem
                contact={item}
                nameInitial={getNameInitial(item.firstName)}
              />
            )}
            stickyHeaderIndices={[0]}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>
                  {!loading && permissionGranted
                    ? 'No contacts found!'
                    : 'You must grant permissions to read your contacts. Go to Settings.'}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};
