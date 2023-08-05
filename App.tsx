import React from 'react';
import { SafeAreaView } from 'react-native';
import { ContadorScreen } from './src/screens/ContadorScreen';

const App = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#3061E3'
    }}>
      <ContadorScreen />
    </SafeAreaView>
  );
};

export default App;
