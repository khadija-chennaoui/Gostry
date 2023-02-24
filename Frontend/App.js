import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Header from './Shared/Header';
import MainNavigator from './Nagivators/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;
