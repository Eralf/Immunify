import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../colors';

var HomeIcon = '../assets/HomeIcon.png';
var CalenderIcon = '../assets/CalenderIcon.png';
var ProfileIcon = '../assets/ProfileIcon.png';

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen_3')}>
        <Ionicons name="calendar-outline"/>
        <Text style={styles.text}>Tanggal Vaksin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color="black" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline"/>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 5,
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.black,
    // fontWeight: 'bold', 
    fontFamily: 'NunitoSans',
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  icon: {
  }
});

export default NavBar;