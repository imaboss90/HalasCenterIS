import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import axios from 'axios';

const QRCodeScreen = ({ userId }) => {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    fetch(`http://10.90.1.199:5000/users/${userId}/qr`)
      .then(response => {
        console.log('Server Response:', response);
        return response.json();
      })
      .then(data => setQrCode(data.qrCode))
      .catch(error => console.error('Error fetching QR code:', error));
  }, [userId]);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {qrCode ? (
        <Image source={{ uri: qrCode }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>Loading QR Code...</Text>
      )}
    </View>
  );
};

export default QRCodeScreen;
