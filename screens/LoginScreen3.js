import React,  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { collection } from 'firebase/firestore';
import { db } from '../firebasecfg';
import { useProfiles } from '../ProfilesContext';
import { useViewChild } from '../ViewChildContext';
import { useUser } from '../UserContext';
import { useChild } from '../ChildContext';


const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {profiles} = useProfiles();
  const {userID, setUserID} = useUser();
  const {childID, setChildID} = useChild();

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert("Error", "Semua data harus diisi.");
      return false;
    }
    const sameProfile = profiles.filter(profile =>
      profile.email === email && profile.password === password
    );
    if(sameProfile && sameProfile.length){
      // console.log(sameProfile);
      // console.log("ID "+sameProfile[0].id);
      // console.log("Email "+sameProfile[0].email);
      setUserID(sameProfile[0].id);
      return true;
    }
    Alert.alert("Error", "Kredensial salah atau email belum terdaftar");
    return false;
  };

  const submitConfirm = () => {
    if (validateForm()) {
      navigation.navigate('HomeTemporarily');
    }
  };

  return (
    <View style={styles.container}>

     <LinearGradient
        colors={['#FFFFFF', '#CFF0FF']}
        style={styles.background}
      />

      <View style={styles.container1}>

        <Text style={styles.title}>Masuk</Text>

        <View style = {styles.container2}>
          <View style={styles.line}/>
          <Text style={styles.separator}>Masukan akun anda</Text>
          <View style={styles.line}/>
        </View>
        

        <TextInput placeholder="Enter Username or Email" style={styles.input} value={email} onChangeText={setEmail}/>
        <TextInput placeholder="Enter password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword}/>

        <TouchableOpacity style = {styles.buttonContainer} onPress={submitConfirm}>   
          <Text style = {styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <Image source={require('../assets/cloud4.png')} style={styles.cloud4} />
        <Image source={require('../assets/late-for-class.png')} style={styles.image} />
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
    width: 400,
    height: 400,
    resizeMode: 'contain',
    top: (dh/-20) + 40,
    right: 80,
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
    right: (dw/-20) - 30,
    height: 150,
    width: 120,
    top: (dh/3) - 10,
    resizeMode: 'contain',
  },
});

export default RegisterScreen;
