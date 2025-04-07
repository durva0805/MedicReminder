import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create an Account</Text>

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

        <TouchableOpacity style={styles.button} onPress={signup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Log In</Text>
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
