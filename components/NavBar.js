import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../colors';

const NavBar = () => {
  
  // const route = useRoute();
  const navigation = useNavigation();


  // const getIconColor = (routeName) => {
  //   return route.name === routeName ? Colors.blue : Colors.black;
  // };

  // const getTextStyle = (routeName) => {
  //   return {
  //     color: route.name === routeName ? Colors.blue : Colors.black,
  //     fontFamily: 'NunitoSans',
  //     textAlign: 'center',
  //     fontSize: 10,
  //   };
  // };

  return (
    
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen_3')}>
        <Ionicons name="calendar" size={24} color = {Colors.black} />
        <Text  style={styles.text}>Tanggal Vaksin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color = {Colors.black} />
        <Text  style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color = {Colors.black}/>
        <Text  style={styles.text}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    height: 70,
  },
  button: {
    flex : 1,
    alignItems : 'center',
  },
  text:{
    fontFamily: 'NunitoSans-Medium',
    textAlign: 'center',
    fontSize: 10,
  }
});

export default NavBar;