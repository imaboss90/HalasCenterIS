import React from 'react';
// Add this before any mongoose usage
import 'react-native-get-random-values'; 

import mongoose from 'mongoose';
// etc...
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen'; // Adjust the path as necessary
import HomeScreen from './src/screens/HomeScreen';  // Adjust the path as necessary
import Milestones from './src/screens/Milestones';
import ProfileScreen from './src/screens/ProfileScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import TestAnimations from './src/screens/TestAnimations';
import Elevation from './src/screens/Elevation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hides the header for the Login screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Welcome' }} // Set the title for the Home screen
        />
        {/* Add more screens here as needed */}
        <Stack.Screen name="Goals" component={Milestones} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="QRScreen" component={QRCodeScreen}/>
        <Stack.Screen name="Test" component={TestAnimations}/>
        <Stack.Screen name="Elevation" component={Elevation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
