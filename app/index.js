import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screen/LoginScreen';
import { ThemeProvider } from './screen/ThemeContext';
import RegisterScreen from './screen/RegisterScreen';


const Stack = createStackNavigator();

export default function App() {

  return (
    // <NavigationContainer> {/* ✅ Only one NavigationContainer here */}
    <ThemeProvider>
      <Stack.Navigator  initialRouteName="Register" screenOptions={{ headerShown: false }}>
   
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} /> 
      
      </Stack.Navigator>
      </ThemeProvider>
    // </NavigationContainer>
  );
}


