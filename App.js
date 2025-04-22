import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigator from "./src/screens/navigation/StackNavigator"; // Importa el StackNavigator
import LoginScreen from "./src/screens/LoginScreen";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "188317837825-1uf718jet4ijsukqttitkj6v0bg831rc.apps.googleusercontent.com",
    androidClientId: "188317837825-cudcnpnjl9bmnicr43r4ga3euc00bejs.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleAuthResponse(response);
  }, [response]);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getLocalUser();
      if (user) {
        setUserInfo(user);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (!parsed.userId || !parsed.givenName) {
      console.warn("Usuario local inválido:", parsed);
      return null;
    }
    return parsed;
  };

  const registerUserWithBackend = async (user) => {
    try {
      console.log("Enviando solicitud POST a backend...");
      console.log("Datos del usuario:", {
        userId: user.id,
        email: user.email,
        givenName: user.given_name,
        profileImageUrl: user.picture,
      });
  
      const response = await fetch('http://192.168.1.168:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          givenName: user.given_name,
          profileImageUrl: user.picture,
        }),
      });
  
      console.log("Respuesta del backend:", response);
      if (!response.ok) {
        throw new Error(`Error al registrar usuario: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Usuario registrado:', responseData);

      return responseData;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario: ' + error.message); // Alerta en la app para ver el error
    }
  };

  const handleAuthResponse = async (response) => {
    if (response?.type === "success") {
      const token = response.authentication.accessToken;
      const user = await getUserInfo(token);
      const adaptedUser = await registerUserWithBackend(user);
      console.log("Usuario adaptado:", adaptedUser);
      
      await AsyncStorage.setItem("@user", JSON.stringify(adaptedUser));
      setUserInfo(adaptedUser);
      console.log("Usuario guardado en AsyncStorage:", userInfo);
    }
  };

  const getUserInfo = async (token) => {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <>
      {userInfo ? (
        <StackNavigator
          userInfo={userInfo}
          onLogout={handleLogout}
          promptAsync={promptAsync}
          request={request}
        />
      ) : (
        <LoginScreen promptAsync={promptAsync} request={request} />
      )}
    </>
  );
}
