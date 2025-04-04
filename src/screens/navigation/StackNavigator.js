import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginScreen';
import TabNavigator from './TabNavigator'; // Importa el TabNavigator

const Stack = createNativeStackNavigator();

const StackNavigator = ({ userInfo, onLogout, promptAsync, request }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userInfo ? (
          <Stack.Screen name="Login">
            {() => <LoginScreen promptAsync={promptAsync} request={request} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {() => <TabNavigator userInfo={userInfo} onLogout={onLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
