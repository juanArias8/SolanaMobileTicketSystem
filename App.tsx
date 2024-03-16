import {clusterApiUrl} from '@solana/web3.js';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from './components/providers/ConnectionProvider';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {UmiProvider} from './components/providers/UmiProvider';
import {Header} from './components/Header';
import MainScreen from './screens/MainScreen';
import NftsScreen from './screens/NftsScreen';
import constants from './util/constants';

const Stack = createNativeStackNavigator();
const endpoint = constants.PUBLIC_RPC || 'https://api.devnet.solana.com';

export default function App() {
  return (
    <NavigationContainer>
      <ConnectionProvider
        config={{commitment: 'processed'}}
        endpoint={clusterApiUrl(RPC_ENDPOINT)}>
        <AuthorizationProvider>
          <UmiProvider endpoint={endpoint}>
            <SafeAreaView style={styles.shell}>
              <Header />
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={MainScreen} />
                <Stack.Screen name="NFTs" component={NftsScreen} />
              </Stack.Navigator>
            </SafeAreaView>
          </UmiProvider>
        </AuthorizationProvider>
      </ConnectionProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shell: {
    height: '100%',
  },
});