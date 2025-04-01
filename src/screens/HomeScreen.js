import React from 'react';
import { View, Text, Button } from 'react-native';
import { removeJwtFromStorage } from '../utils/jwtStorage';  // Para cerrar sesión

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Elimina el JWT de AsyncStorage
    await removeJwtFromStorage();
    // Redirige a la pantalla de login
    navigation.replace('Login');
  };

  return (
    <View>
      <Text>Bienvenido a la aplicación!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
