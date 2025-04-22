import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const SuggestedUsersScreen = ({ userInfo }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await fetch(`http://<tu_backend_url>/api/usuarios/${userInfo.userId}/sugerencias?page=0&size=10`);
        
        if (!response.ok) {
          throw new Error('Could not fetch suggested users');
        }

        const data = await response.json();
        setSuggestedUsers(data.content);
        setLoading(false);
      } catch (error) {
        setError('Error loading suggestions');
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [userInfo.userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
            <Text style={styles.username}>{item.givenName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
  },
});

export default SuggestedUsersScreen;
