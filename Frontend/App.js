import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import Header from './Shared/Header';
import MainNavigator from './Nagivators/MainNavigator';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Header />
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
