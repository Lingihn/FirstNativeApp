/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Card } from './components/Card/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './components/Home';


export const API_URL = 'https://api.unsplash.com'
export const API_ACCESS_KEY = 'AhXstOVlPrzPfO1sC_76IyZkrXImj90zTXwKiTeN8ws'
export type RootStackParamList = {
  Home: undefined,
  Card: { id: string }
}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name='Card'>
          {(props) => <Card {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
