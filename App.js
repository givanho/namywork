import React from "react";
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Box } from "native-base";
export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      </Box>
    </NativeBaseProvider>
  );
}


