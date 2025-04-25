import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginScreen';
import SinglePublication from '../SinglePublication';
import TicketFormScreen from '../TicketFormScreen';
import ChatScreen from '../ChatScreen';
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
          <>
            <Stack.Screen name="Main">
              {() => <TabNavigator userInfo={userInfo} onLogout={onLogout} />}
            </Stack.Screen>
            <Stack.Screen name="SinglePublication">
              {({ route, navigation }) => (
                <SinglePublication
                  route={route}
                  navigation={navigation}
                  userInfo={userInfo}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="TicketFormScreen">
              {({ route, navigation }) => (
                <TicketFormScreen
                  route={route}
                  navigation={navigation}
                  userInfo={userInfo}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="ChatScreen">
              {({ route, navigation }) => (
                <ChatScreen
                  route={route}
                  navigation={navigation}
                  userInfo={userInfo}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
