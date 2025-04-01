import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "188317837825-1uf718jet4ijsukqttitkj6v0bg831rc.apps.googleusercontent.com",
    androidClientId: "188317837825-cudcnpnjl9bmnicr43r4ga3euc00bejs.apps.googleusercontent.com",
  });

  useEffect(() => {
    console.log("response", response); // Log la respuesta de Google
    handleEffect();
  }, [response]); // Trigger only when response changes

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user && response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
    } else if (user) {
      setUserInfo(user);
      console.log("User loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log("User Info JSON:", user); // Nuevo console.log para ver toda la información del usuario
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>WELCOME</Text>
          <Text style={styles.text}>
          {userInfo.given_name}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("@user");
          setUserInfo(null); // Clear local state after removal
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Remove local store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});


