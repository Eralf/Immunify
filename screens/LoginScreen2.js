import React,  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
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
        

        <TextInput placeholder="Enter your name" style={styles.input} />
        <TextInput placeholder="Enter Email" style={styles.input} />
        <TextInput placeholder="Enter password" style={styles.input} secureTextEntry />

        <View style={styles.checkboxContainer}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}/>
          <Text style={styles.checkboxText}>Saya setuju dengan Syarat dan Ketentuan yang berlaku</Text>
        </View>

        <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('RegisterScreen')}>   
          <Text style = {styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

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
    height: 50
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
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#01A2FF',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default RegisterScreen;
