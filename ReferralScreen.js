import React, { useState, useEffect } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import axios from 'axios';

const ReferralScreen = () => {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    // Fetch the referral link from your API
    const fetchReferralLink = async () => {
      try {
        const response = await axios.get('http://localhost:3000/register'); // Replace with your API endpoint
        if (response.data.referralLink) {
          setReferralLink(response.data.referralLink);
        }
      } catch (error) {
        console.error('Error fetching referral link:', error);
      }
    };

    fetchReferralLink();
  }, []);

  const handleShareReferralLink = () => {
    if (referralLink) {
      // You can use the Linking module to open the share dialog
      Linking.openURL(`mailto:?subject=Join My App&body=Here's your referral link: ${referralLink}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your Referral Link:</Text>
      <Text>{referralLink}</Text> {/* Display the referral link here */}
      <Button title="Share Referral Link" onPress={handleShareReferralLink} />
    </View>
  );
};

export default ReferralScreen;
