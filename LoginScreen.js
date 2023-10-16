import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Login successful, show success message
        setMessage('Login successful');
        setMessageType('success');
        navigation.navigate('DashboardScreen');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle the error here (you can display an error message to the user if needed)
      setMessage('Login failed');
      setMessageType('error');
    } finally {
      // Show the flash message
      setShowMessage(true);
    }
  };

  const navigateToRegistration = () => {
    // Navigate to the RegisterScreen
    navigation.navigate('RegisterScreen');
  };

  const navigateToForgotPasswordScreen = () => {
    // Navigate to the ForgotPasswordScreen
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {showMessage && (
          <Text
            style={
              messageType === 'error'
                ? styles.errorMessage
                : styles.successMessage
            }
          >
            {message}
          </Text>
        )}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} color="#ff6347" />
        <TouchableOpacity onPress={navigateToRegistration}>
          <Text style={styles.registerText}>Not registered? Register here</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToForgotPasswordScreen}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
  registerText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default LoginScreen;
