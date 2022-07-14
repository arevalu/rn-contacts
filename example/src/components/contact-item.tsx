import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Contact } from 'rn-contacts';

/**
 * Types
 */

interface ContactItemProps {
  contact: Contact;
  nameInitial: string;
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#aee',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginRight: 24,
    width: 48,
  },
  avatarLetter: {
    fontSize: 24,
  },
  contactName: {
    fontSize: 20,
  },
  contactPhone: {
    color: '#5d5d5d',
    fontSize: 16,
  },
});

/**
 * ContactItem
 */

export const ContactItem: FunctionComponent<ContactItemProps> = ({
  contact: { firstName, lastName, phoneNumber },
  nameInitial,
}) => (
  <View style={styles.wrapper}>
    <View style={styles.avatar}>
      <Text style={styles.avatarLetter}>{nameInitial}</Text>
    </View>
    <View>
      <Text style={styles.contactName}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.contactPhone}>{phoneNumber}</Text>
    </View>
  </View>
);
