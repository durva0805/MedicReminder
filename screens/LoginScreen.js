import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Welcome Back!</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});
