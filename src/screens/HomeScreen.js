import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from 'prop-types';

const HomeScreen = ({ route, onLogout }) => {
  const { given_name, picture } = route.params || {}; 

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {given_name || ""}!</Text>
      <Image source={{ uri: picture }} style={styles.image} />
      <TouchableOpacity onPress={onLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Validación de props con PropTypes
HomeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      given_name: PropTypes.string,
      picture: PropTypes.string,
    }),
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#F44336",
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

export default HomeScreen;

