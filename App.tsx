import React, { FC } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routing from './Routing';

const App: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Routing></Routing>
    </View>
  );
}
export default App;
