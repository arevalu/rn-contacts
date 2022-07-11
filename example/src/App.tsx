import React, { FunctionComponent } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'rn-contacts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App: FunctionComponent = () => {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
};

export default App;
