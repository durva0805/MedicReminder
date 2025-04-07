import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import useAuth from '../hooks/useAuth';
import userIcon2 from '../assets/userIcon2.jpg';
import Icon from 'react-native-vector-icons/Ionicons';  

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const toggleNotification = () => setIsNotificationEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Icon name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.profilePicContainer}>
        <Image
          source={userIcon2} 
          style={styles.profilePic}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{user?.displayName || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }} 
          thumbColor={isNotificationEnabled ? "#007bff" : "#f4f3f4"} 
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotification}
          value={isNotificationEnabled}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 70, 
    left: 20, 
    zIndex: 1, 
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 15,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
