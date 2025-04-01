import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useGoogleAuth } from '../config/authConfig';  // Usamos el hook de autenticación
import { saveJwtToStorage } from '../utils/jwtStorage';  // Función para guardar el JWT en AsyncStorage

const LoginScreen = ({ navigation }) => {
  const { loginWithGoogle, request, response } = useGoogleAuth();  // Usamos el hook de Google Auth
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Resetear cualquier mensaje de error

    try {
      const result = await loginWithGoogle();
      console.log("🔍 Resultado de Google Auth:", result);  // Ver qué devuelve realmente
      if (result?.type === 'success' && result?.params?.id_token) {
        const { id_token } = result.params;
        console.log("✅ Token de Google recibido:", id_token);
  
        // Guardamos el JWT en AsyncStorage
        await saveJwtToStorage(id_token);
  
        // Redirigimos al Home si el token es válido
        navigation.replace('Home');
      } else {
        throw new Error('No se obtuvo un id_token válido de Google');
      }
    } catch (error) {
      console.error('Error en login con Google: ', error);
      setErrorMessage('Error de autenticación con Google. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Login with Google</Text>
      <Button 
        title="Login with Google"
        onPress={handleGoogleLogin}
        disabled={!request}
      />
      {loading && <ActivityIndicator size="large" />}
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

export default LoginScreen;

