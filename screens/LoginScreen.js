import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,Image, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dw = Dimensions.get('window').width
const dh = Dimensions.get('window').height
const LoginScreen = ({navigation, route }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#FFFFFF', '#CFF0FF']}
          style={styles.background}
      />
      
      <ImageBackground>
        <Image source = {require('../assets/cloud1.png')} style ={styles.cloud1}/>
        <Image source = {require('../assets/cloud2.png')} style ={styles.cloud2}/>
        <Image source = {require('../assets/cloud3.png')} style ={styles.cloud3}/>
        {/* <Image source = {require('../assets/cloud4.png')} style ={styles.cloud4}/> */}
      </ImageBackground>

      
      <View style = {styles.container1}>
        <Text style={styles.text}>Selamat Datang di</Text>
        <Text style={styles.title}>Immunify</Text>
        <Text style={styles.description}>Atur vaksin mu dari satu aplikasi</Text>

        <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('RegisterScreen')}>   
          <Text style = {styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

        <View  style = {styles.container2}>
          <Text style = {styles.container2.text1}>Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterScreen')}>
           <Text style = {styles.container2.text2}>Masuk</Text>
          </TouchableOpacity>
            
          
        </View>

        <Image source = {require('../assets/growth.png')} style ={styles.image}/> 
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    paddingTop: 250,
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
    flexDirection: 'row',
      text1: {
        color: '#867F7F',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5,
      },
      text2: {
        color: '#01A2FF',
        fontSize: 15,
        fontWeight: 'bold',
      }
  },
  text: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 35,
    color: '#01A2FF',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 15,
    color: '#01A2FF',
    marginBottom: 100,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9E5FF',
    margin: 5,
    borderRadius: 50,
    width: 200,
    height: 50
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: dh,
  },
  image:{
    height: 230, 
    width: 230,
  },
  cloud1: {
    position: 'absolute',
    top: 0,
    height: 80,
    right: (dw/-2) - 15,
    resizeMode: 'contain'
  },
  cloud2: {
    position: 'absolute',
    right: (dw/-10) + 150,
    height: 100,
    width: 100,
    top: 10,
  },
  cloud3: {
    position: 'absolute',
    right: (dw/-2) - 15,
    height: 150,
    width: 100,
    top: 180,
    resizeMode: 'contain',
  },
});
export default LoginScreen;