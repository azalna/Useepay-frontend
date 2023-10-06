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

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');



  // Function to fetch flash messages from the backend
  



  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
      });

      if (response.data.message === 'User registered successfully') {
        // Registration successful, show success message
        setMessage('Registration successful');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle the error here (you can display an error message to the user if needed)
      setMessage('Registration failed');
      setMessageType('error');
    } finally {
      // Show the flash message
      setShowMessage(true);
    }
    
  };

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
        <Button title="Register" onPress={handleRegistration} />
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
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
  loginLink: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default RegistrationScreen;
