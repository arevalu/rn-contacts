import React, { FunctionComponent } from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { SafeArea } from './components';
import { Home } from './screens';

/**
 * App
 */

const App: FunctionComponent = () => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <SafeArea>
      <Home />
    </SafeArea>
  </SafeAreaProvider>
);

export default App;
