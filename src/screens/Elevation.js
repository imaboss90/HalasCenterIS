import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const Elevation = () => {
  const [elevation, setElevation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [watcher, setWatcher] = useState(null);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    const watch = await Location.watchPositionAsync(
      { timeInterval: 10, distanceInterval: 0.5 },
      (location) => {
        const elevationInInches = location.coords.altitude * 39.37;
        setElevation(elevationInInches);
      }
    );

    setWatcher(watch);
    setTracking(true);
  };

  const stopTracking = () => {
    if (watcher) {
      watcher.remove();
      setWatcher(null);
    }
    setTracking(false);
  };

  /*Initial Testing
  import * as Location from 'expo-location';

// Function to get the user's current location
async function getCurrentLocation() {
  try {
    // Request permission to access the device's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      
      // Extract the elevation data from the location
      const elevation = location.coords.altitude;
      
      // Log the elevation to the console
      console.log(`Current Elevation: ${elevation} meters`);
      
      // Here, you can further process the elevation data or use it in your application
    } else {
      console.error('Location permission denied');
    }
  } catch (error) {
    console.error('Error getting location:', error);
  }
}

// Call the function to get the current location and elevation
getCurrentLocation();
 */

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Halas Center</Text>
      <Text>Current Elevation: {elevation ? `${elevation.toFixed(2)} inches` : 'Calculating...'}</Text>
      {tracking ? (
        <Button title="Stop Tracking Elevation" onPress={stopTracking} />
      ) : (
        <Button title="Start Tracking Elevation" onPress={startTracking} />
      )}
    </View>
  );
};

export default Elevation;
