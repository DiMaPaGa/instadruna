import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const ProfileScreen = ({ route }) => {
  const { given_name, picture, id } = route.params || {}; // Acceder a los params desde route

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{given_name}</Text>
      <Image source={{ uri: picture }} style={styles.profileImage} />
      <Text style={styles.id}>User ID: {id}</Text>
    </View>
  );
};

ProfileScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      given_name: PropTypes.string,
      picture: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  id: {
    fontSize: 16,
  },
});

export default ProfileScreen;