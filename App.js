/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/SplashScreen';
import CheckinScreen from './src/screens/CheckinScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Checkin" component={CheckinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
