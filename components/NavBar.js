import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView, Dimensions, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../colors';

const windowHeight = Dimensions.get('window').height;

const useKeyboard = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardOpen(true)
    );
    const keyboardCloseListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardOpen(false)
    );

    return () => {
      if (keyboardOpenListener) keyboardOpenListener.remove();
      if (keyboardCloseListener) keyboardCloseListener.remove();
    };
  }, []);

  return isKeyboardOpen;
}

const getStyle = () =>{
  const isKeyboardOpen = useKeyboard();
  if(isKeyboardOpen){
    return {height:0, width:0}
  }
  return {height: 70}
}

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
    <SafeAreaView style={[styles.content, getStyle()]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen_3')}>
        <Ionicons name="calendar" size={24} color = {Colors.black} />
        <Text style={styles.text}>Tanggal Vaksin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTemporarily')}>
        <Ionicons name="home" size={24} color = {Colors.black} />
        <Text  style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color = {Colors.black}/>
        <Text  style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    // height: 70,
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