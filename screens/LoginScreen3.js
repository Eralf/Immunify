import React,  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const RegisterScreen = ({ navigation, route }) => {
  const [isChecked,setChecked] = useState(false);
  return (
    
    


    <View style={styles.container}>

     <LinearGradient
        colors={['#FFFFFF', '#CFF0FF']}
        style={styles.background}
      />

      <View style={styles.container1}>

        <Text style={styles.title}>Daftar</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Daftar dengan akun Google</Text>
          <Image source={require('../assets/googleLogo.png')} style={styles.googleIcon} />
        </TouchableOpacity>

        <View style = {styles.container2}>
          <View style={styles.line}/>
          <Text style={styles.separator}>Atau lanjut dengan Email</Text>
          <View style={styles.line}/>
        </View>
        

        <TextInput placeholder="Enter Username or Email" style={styles.input} />
        <TextInput placeholder="Enter password" style={styles.input} secureTextEntry />

        <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('RegisterScreen')}>   
          <Text style = {styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <Image source={require('../assets/cloud4.png')} style={styles.cloud4} />
        <Image source={require('../assets/new-beginnings.png')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#CFF0FF',
  },
  container1: {
    width: dw * 0.8,
    alignItems: 'center',
    marginTop: 20,
  },
  container2: {
    flexDirection: 'row',
    alignContent: 'center',   
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9E5FF',
    borderRadius: 50,
    width: 200,
    height: 50,
    marginTop:20,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 25,
    height: 50,
    width: (dw/2) + 55,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    height: 25,
    marginRight: 10,
  },
  googleIcon: {
    marginLeft: 5,
    marginRight: 10,
    width: 20,
    height: 20,
  },
  separator: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
  line :{
    borderBottomColor: 'black', 
    borderBottomWidth: 2,
    width: 100,
    top: (dh/-18),
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 3,
    height: 35,
  },
  image: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    top: dh/-20
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: dh,
  },
  cloud4: {
    flex:1,
    position: 'absolute',
    // right: (dw/-2) - 15,
    height: 150,
    width: 100,
    top: (dh/3) + 200,
    resizeMode: 'contain',
  },
});

export default RegisterScreen;
