import React,  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, Modal} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebasecfg';
import { useProfiles } from '../ProfilesContext';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const RegisterScreen = ({ navigation, route }) => {
  const [isChecked,setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {profiles} = useProfiles();
  // const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Semua data harus diisi.");
      return false;
    }
    if(!isChecked){
      Alert.alert("Error", "Anda harus setuju dengan Syarat dan Ketentuan yang berlaku");
      return false;
    }
    // Alert.alert("Error", "Email sudah terdaftar. Silahkan menuju ke Login page");
    console.log(profiles);
    const sameProfile = profiles.filter(profile =>
      profile.emailAddress === email
    );
    console.log(sameProfile);
    if(sameProfile && sameProfile.length){
      Alert.alert("Error", "Email sudah terdaftar. Silahkan menuju ke Login page");
      return false;
    }
    return true;
  };

  const submitConfirm = () => {
    if (validateForm()) {
      addDoc(collection(db, "profiles"), {
        emailAddress: email,
        name: name,
        password: password,
        profilePictureFile: "gs://immunify-5c493.appspot.com/images/profilePictures/parentPFP/default_PFP.jpg",
      }).then(() => {
        navigation.navigate('Home');
        console.log('Profile added successfully');
      }).catch((error) => {
        console.error('Error adding appointment: ', error);
      });
    }
  };

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
        

        <TextInput placeholder="Enter your name" style={styles.input} value={name} onChangeText={setName}/>
        <TextInput placeholder="Enter Email" style={styles.input} value={email} onChangeText={setEmail}/>
        <TextInput placeholder="Enter password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword}/>

        <View style={styles.checkboxContainer}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}/>
          <Text style={styles.checkboxText}>Saya setuju dengan Syarat dan Ketentuan yang berlaku</Text>
        </View>

        <TouchableOpacity style = {styles.buttonContainer} onPress={submitConfirm}>   
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
