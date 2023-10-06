import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Login successful, you can store the token or perform other actions here
        // For example, you can navigate to a protected dashboard screen
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const navigateToRegistration = () => {
    // Navigate to the RegisterScreen
    navigation.navigate('RegisterScreen'); // Make sure this matches the name of your file
  };

  return (
    <ImageBackground
    source={require('./assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        <Button
  title="Login"
  onPress={handleLogin}
  color="#ff6347" // Replace with your desired color code
/>

<Text
          style={styles.registerText}
          onPress={navigateToRegistration}
          color="red"
        >
          Not registered? Register here
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different effects
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add a semi-transparent black overlay for better readability
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Text color
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white', // Input background color
    borderRadius: 5, // Add some border radius for rounded corners
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
