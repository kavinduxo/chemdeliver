import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import DrawerNav from './components/DrawerNav';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <DrawerNav />
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
}
