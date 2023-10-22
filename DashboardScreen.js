import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileIcon from './assets/profile.png';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMining, setIsMining] = useState(false); // Added state for mining toggle

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleMining = () => {
    setIsMining(!isMining);
  };

  const handleButton1Click = () => {
    // Do something when Button 1 is clicked
  };

  const handleButton2Click = () => {
    // Do something when Button 2 is clicked
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // After logging out, navigate to the login screen
    navigation.replace('LoginScreen');
  };

  const isSmallDevice = Dimensions.get('window').width < 375;

  const handleProfileClick = () => {
    // Navigate to the ProfileScreen
    navigation.navigate('ProfileScreen');
  };

  // Handle the "Invite Friends" button click
  const handleInviteFriends = () => {
    navigation.navigate('ReferralScreen');
  };

  return (
    <View style={styles.container}>
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
        <Button title="Invite Friends" onPress={handleInviteFriends} color="#ff8397" />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Start Mining" onPress={handleButton1Click} />
        <Button title="Stop Mining" onPress={handleButton2Click} color="#ff6347" />
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.bottomButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.bottomButtonText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isMining ? toggleMining : handleLogout}>
          <Text style={styles.bottomButtonText}>
            {isMining ? 'Stop Mining' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleProfileClick} style={styles.profileIconContainer}>
        <Image source={ProfileIcon} style={[styles.profileIcon, isSmallDevice && styles.smallDeviceProfileIcon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 50,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
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
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
  smallDeviceProfileIcon: {
    width: 20,
    height: 20,
  },
});

export default DashboardScreen;
