import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType] = useState('');

  const sendPasswordResetEmail = async () => {
    try {
      // Send the email to the user with a password reset link
      const response = await axios.post('http://localhost:3000/forgot-password', {
        email: userEmail,
      });

      if (response.data.message === 'Password reset email sent') {
        setMessage('Password reset email sent successfully.');
      } else {
        setMessage('Failed to send the password reset email.');
      }
    } catch (error) {
      console.error('Error sending the password reset email:', error);
      setMessage('Failed to send the password reset email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        value={userEmail}
        onChangeText={setUserEmail}
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={sendPasswordResetEmail} />

      <Text style={messageType === 'error' ? styles.errorMessage : styles.successMessage}>
        {message}
      </Text>
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
