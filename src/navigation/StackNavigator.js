import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';  // Pantalla de Login
import HomeScreen from '../screens/HomeScreen';  // Pantalla principal
import { getJwtFromStorage } from '../utils/jwtStorage';  // Función para obtener el JWT

const Stack = createNativeStackNavigator();

const StackNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator>
  {isAuthenticated ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </>
  ) : (
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  )}
</Stack.Navigator>
  );
};

export default StackNavigator;

