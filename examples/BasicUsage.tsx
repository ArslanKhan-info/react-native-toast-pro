import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AlertProvider, useAlert } from '../src';

// Example component showing how to use the toast alerts
const ExampleComponent = () => {
  const { showSuccess, showError } = useAlert();

  return (
    <View style={styles.container}>
      <Button
        title="Show Success Toast"
        onPress={() => showSuccess('Operation completed successfully!')}
      />
      <View style={styles.spacer} />
      <Button
        title="Show Error Toast"
        onPress={() => showError('Something went wrong!')}
      />
    </View>
  );
};

// Main app component with AlertProvider
const App = () => {
  return (
    <AlertProvider>
      <ExampleComponent />
    </AlertProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spacer: {
    height: 20,
  },
});

export default App;
