import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(null);

  // This ID should be dynamically obtained after the user logs in.
  const userId = 'CURRENTLY_LOGGED_IN_USER_ID';
console.log(userId);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://10.90.1.199:5000/users/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  const MenuItem = ({ title, children }) => {
    const isOpen = expanded === title;
    return (
      <View>
        <TouchableOpacity style={styles.menuItem} onPress={() => setExpanded(isOpen ? null : title)}>
          <Text style={styles.menuItemText}>{title}</Text>
          <Text style={styles.arrow}>{isOpen ? '↓' : '→'}</Text>
        </TouchableOpacity>
        {isOpen && <View style={styles.subMenu}>{children}</View>}
      </View>
    );
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image style={styles.profilePic} source={{ uri: user.profilePic || 'https://via.placeholder.com/100' }} />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.id}>#{user.studentId}</Text>
      </View>
      <View style={styles.menu}>
        <MenuItem title="My Information">
          {/* Additional user information components can go here */}
        </MenuItem>
        <MenuItem title="My Clubs">
          <Text style={styles.subMenuItem}>Club Details</Text>
          <Text style={styles.subMenuItem}>Club Events</Text>
          <Text style={styles.subMenuItem}>Past Games</Text>
        </MenuItem>
        <MenuItem title="Inbox">
          {/* Inbox components go here */}
        </MenuItem>
        <MenuItem title="Settings">
          {/* Settings components go here */}
        </MenuItem>
        <MenuItem title="Logout">
          {/* Logout function goes here */}
        </MenuItem>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'maroon',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white', // Temporary background color
  },
  name: {
    color: 'white',
    fontSize: 20,
    marginTop: 8,
  },
  id: {
    color: 'white',
    fontSize: 16,
  },
  menu: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  menuItemText: {
    color: 'white',
  },
  arrow: {
    color: 'white',
  },
  subMenu: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  subMenuItem: {
    color: 'white',
    padding: 12,
    paddingLeft: 20,
  },
});

export default ProfileScreen;
