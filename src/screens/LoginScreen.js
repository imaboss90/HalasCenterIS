import React, { useState } from 'react';
import { View, Button, TextInput, Alert, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import axios from 'axios';
  

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    'Hermeneus One': require('../../assets/fonts/HermeneusOne-Regular.ttf'),
    'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'), 
  });
  
  if(!fontsLoaded) {
    return null; 
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.90.1.199:5000/login', {
        username,
        password
      });
  
      // With axios, response data is found in `response.data`
      
      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Network request failed');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HALAS CENTER</Text>
      <Image source={require('../../assets/bler.png')} style={styles.logo} />

      <Text style={styles.label}>Username (UVID)</Text>
      <TextInput 
        style={styles.input}
        value={username}
        onChangeText={setUsername} 
        placeholder="Username" 
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />

      <Button 
        title="LOGIN"
        onPress={handleLogin}
        style={styles.button} 
      ></Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: '-18%', 
    
    width: '100%', 
    height: '120%', 
    backgroundColor: '#582931',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 317,
    height: 46,
    backgroundColor: '#D9D9D9',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 13, 
    marginBottom: 20,
    paddingLeft: 10
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginLeft: 29,
  },
  title: {
    fontFamily: 'Hermeneus One',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  logo: {
    width: 167,
    height: 133,
    marginBottom: 20,
  },
  button:{
    position: 'absolute',
    left: 143,
    top: 562, 
    width: 94,
    height: 20,   
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 35, 
    color: '#FFFFFF'
  }
});


export default LoginScreen;
