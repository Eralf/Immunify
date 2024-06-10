import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LinearGradient } from 'expo-linear-gradient';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const VaccineDetailsScreen = ({ navigation, route }) => (
  <View style={styles.container}>

    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      style={styles.background} />

    <View style={styles.container1}>
      <Text style={styles.text}>Vaskin Hepatitis B</Text>
      <Text style={styles.description}>Vaksin hepatitis B mengandung antigen permukaan virus hepatitis B (HBsAg) yang sudah dinonaktifkan. Vaksin ini bekerja dengan cara merangsang sistem kekebalan tubuh agar menghasilkan antibodi untuk melawan virus.</Text>
    </View>

    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Daftar Sekarang</Text>
    </TouchableOpacity>

    <Image source={require('../assets/jumping-air.png')} style={styles.image} />

  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  container1: {
    alignContent: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
    paddingHorizontal: 5
  },
  description:{
    textAlign: 'justify',
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'NunitoSans-Medium',
    width: dw/2 + 150,
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: 'light'
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#E7FCFF',
    borderRadius: 25,
    paddingVertical: 10,
    width: '50%',
    justifyContent:'center',
    alignContent: 'center',
  },
  buttonText: {
    color: Colors.black,
    fontWeight: 'light',
    fontSize: 18,
    width: 76,
    textAlign:'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: dh,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    top: (dh/-20) + 50,
  },
});

export default VaccineDetailsScreen;

