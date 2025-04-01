import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '188317837825-1uf718jet4ijsukqttitkj6v0bg831rc.apps.googleusercontent.com', // Web client ID
    scopes: ['openid', 'profile', 'email'],  // Agregamos "openid"
    useProxy: true,  // Usa el proxy de Expo
  });

  const saveJwtToStorage = async (token) => {
    try {
      await AsyncStorage.setItem('id_token', token);
    } catch (error) {
      console.error('Error guardando el token:', error);
    }
  };

  const loginWithGoogle = async () => {
    // Aquí intentamos la autenticación
    const result = await promptAsync();
    console.log("🔍 Resultado de Google Auth:", result);  // 👀 Ver qué devuelve

    if (result?.type === 'success' && result.params?.id_token) {
      const { id_token } = result.params;
      console.log("✅ Token de Google recibido:", id_token);

      // Enviar el token al backend para validarlo
      try {
        const response = await fetch('http://192.168.1.168:8080/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_token }),
        });

        if (response.ok) {
          const data = await response.json();
          const validatedToken = data.id_token;  // Ahora el backend devuelve el mismo token validado

          if (validatedToken) {
            await saveJwtToStorage(validatedToken);
            return validatedToken;
          } else {
            console.error("Error en la respuesta del backend, no se recibió un token válido.");
          }
        } else {
          console.error("Error en la autenticación con el backend.");
        }
      } catch (error) {
        console.error("Error al enviar el token de Google al backend:", error);
      }
    } else if (result?.type === 'dismiss') {
      console.log("El usuario canceló el flujo de autenticación.");
    } else {
      console.error("Error: No se obtuvo un id_token válido de Google.");
    }
  };

  return { loginWithGoogle, request, response };
};
