import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './screens/mapScreen';
import AddMark from './screens/addMark';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddMark" component={AddMark} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}