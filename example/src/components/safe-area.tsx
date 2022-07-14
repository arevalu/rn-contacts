import React, { FunctionComponent, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Types
 */

interface SafeAreaProps {
  backgroundColor?: string;
  children: ReactNode;
  horizontalSpacing?: boolean;
  spacing?: boolean;
}

/**
 * Styled components
 */

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
/**
 * Container
 */

export const SafeArea: FunctionComponent<SafeAreaProps> = ({
  backgroundColor,
  children,
  ...containerProps
}) => {
  const insets = useSafeAreaInsets();

  const SafeAreaStyles = {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom + 16,
    paddingLeft: insets.left,
  };

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: backgroundColor || 'white' },
        SafeAreaStyles,
      ]}
      {...containerProps}
    >
      {children}
    </View>
  );
};
