import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  // Replace these with actual navigation functions/routes
  const goToUserProfile = () => navigation.navigate('Test');
  const goToQRScreen = () => navigation.navigate('Goals');
  const goToSomeOtherScreen = (screenName) => console.log('Go to', screenName);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToUserProfile}>
          <Icon name="person-circle-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToQRScreen} style={styles.qrIcon}>
          <Icon name="qr-code-outline" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text>News Feed:</Text>
        {/* Display list of news articles here */}
        
        <Text>Recent Gym Activity:</Text>
        {/* Display recent gym check-ins and interactions here */}
      </View>

      <View style={styles.navBar}>
        {/* Replace these with actual icons and navigation functions/routes */}
        <TouchableOpacity onPress={() => goToSomeOtherScreen('Screen1')}>
          <Icon name="home-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToSomeOtherScreen('Screen2')}>
          <Icon name="list-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToSomeOtherScreen('Screen3')}>
          <Icon name="add-circle-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToSomeOtherScreen('Screen4')}>
          <Icon name="notifications-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToSomeOtherScreen('Screen5')}>
          <Icon name="settings-outline" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  qrIcon: {
    alignSelf: 'flex-end'
  },
  content: {
    flex: 1,
    padding: 20
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc'
  }
});

export default HomeScreen;
