import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

const DashboardScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
    const handleButton1Click = () => {
      // Do something when Button 1 is clicked
    };
  
    const handleButton2Click = () => {
      // Do something when Button 2 is clicked
    };
  
    const handleLogout = () => {
      // Add your logout logic here (e.g., clearing tokens or user data)
      // After logging out, navigate to the login screen
      navigation.replace('LoginScreen'); // Use replace to prevent going back to the dashboard
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mining Dashboard</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>...</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <View style={styles.menuModal}>
          <Pressable onPress={toggleMenu} style={styles.menuCloseButton}>
            <Text style={styles.menuCloseButtonText}>Close</Text>
          </Pressable>
          <View style={styles.menuContent}>
          <Button title="profile" onPress={() => {/* Handle Help */}} />
          <Button title="Wallet" onPress={() => {/* Handle Help */}} />
          <Button title="Staking" onPress={() => {/* Handle Help */}} />
          <Button title="Rewards" onPress={() => {/* Handle Help */}} />
            <Button title="Settings" onPress={() => {/* Handle Settings */}} />
            <Button title="Help" onPress={() => {/* Handle Help */}} />
            {/* Add more menu items as needed */}
          </View>
        </View>
      </Modal>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Mining Speed</Text>
          <Text style={styles.statValue}>1.5 TH/s</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Earnings</Text>
          <Text style={styles.statValue}>0 USEP</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Start Mining" onPress={handleButton1Click} />
        <Button title="Stop Mining" onPress={handleButton2Click} color="#ff6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    position: 'absolute',
    top: 16,    // Adjust the top position as needed
    right: 16,  // Adjust the right position as needed
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  menuCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 16,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginBottom: 20,
  },
});

export default DashboardScreen;
