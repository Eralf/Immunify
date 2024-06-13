import React,  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ScrollView, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebasecfg';
import { useProfiles } from '../ProfilesContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const RegisterScreen = ({ navigation, route }) => {
  const [isChecked,setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [NIK, setNIK] = useState('');
  const [sex, setSex] = useState(false);
  const [DOB, setDOB] = useState(new Date(new Date()-5.3654e11));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {profiles} = useProfiles();
  // const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(null);
  // console.log(new Date(new Date()-5.365e11).toString());
  // console.log(DOB);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const today = new Date(new Date()-5.3654e11);
    if (currentDate > today) {
      Alert.alert("Error", "Anda harus minimal 17 tahun.");
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setDOB(currentDate);
  };

  const requestPermissions = async () => {
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Permissions required', 'You need to grant camera and storage permissions to select or take an image.');
      return false;
    }
    return true;
  };

  const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    setUploading(true);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = 'KTP_'+name+"_"+NIK;

    const storageRef = ref(storage, `images/KTP/${filename}`);
    uploadBytes(storageRef, blob)
      .then(snapshot => {
        return getDownloadURL(snapshot.ref);
      })
      .then(downloadURL => {
        console.log('File available at', downloadURL);
        // Alert.alert('Success', 'Image uploaded successfully');
        setImageUri(null);
      })
      .catch(error => {
        console.error('Upload failed', error);
        Alert.alert('Error', 'Image upload failed');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const validateForm = () => {
    if (!name || !email || !password || !NIK) {
      Alert.alert("Error", "Semua data harus diisi.");
      return false;
    }
    if(!isChecked){
      Alert.alert("Error", "Anda harus setuju dengan Syarat dan Ketentuan yang berlaku");
      return false;
    }
    // console.log(profiles);
    const sameProfile = profiles.filter(profile =>
      profile.emailAddress === email
    );
    // console.log(sameProfile);
    if(sameProfile && sameProfile.length){
      Alert.alert("Error", "Email sudah terdaftar. Silahkan menuju ke Login page");
      return false;
    }
    const sameNIK = profiles.filter(profile =>
      profile.NIK === NIK
    );
    if(sameNIK && sameNIK.length){
      Alert.alert("Error", "NIK sudah terdaftar. Silahkan menuju ke Login page");
      return false;
    }
    if(!imageUri){
      Alert.alert("Error", "Foto KTP harus diunggah.");
      return false;
    }
    return true;
  };

  const submitConfirm = () => {
    if (validateForm()) {
      uploadImage();
      if(!uploading){
        addDoc(collection(db, "profiles"), {
          emailAddress: email,
          name: name,
          password: password,
          profilePictureFile: "gs://immunify-5c493.appspot.com/images/profilePictures/parentPFP/default_PFP.jpg",
          KTPfile: "gs://immunify-5c493.appspot.com/images/KTP/KTP_"+name+"_"+NIK,
          dob:DOB,
          sex:sex,
          nik:NIK,
        }).then(() => {
          navigation.navigate('Home');
          console.log('Profile added successfully');
        }).catch((error) => {
          console.error('Error adding appointment: ', error);
        });
      }
    }
  };

  return (
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{width:dw, alignItems:'center', justifyContent:'center'}}>
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
        

        <TextInput placeholder="Masukkan nama" style={styles.input} value={name} onChangeText={setName}/>
        <TextInput placeholder="Masukkan email" style={styles.input} value={email} onChangeText={setEmail}/>
        <TextInput placeholder="Masukkan password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword}/>
        <TextInput placeholder="Masukkan NIK" style={styles.input} value={NIK} onChangeText={setNIK}/>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
          <TextInput
            style={[styles.input, {fontWeight:'condensedBold'}]}
            placeholder="DOB"
            value={"Masukkan DOB: " + DOB.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={DOB}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <View style={[styles.input, {overflow:'hidden'}]}>
        <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
          >
            <Picker.Item label="Laki-laki" value={false}/>
            <Picker.Item label="Perempuan" value={true}/>
          </Picker>
        </View>
        <TouchableOpacity style={styles.input} onPress={selectImage}>
          <Text style={styles.pickImageText}>Pilih Gambar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={takePhoto}>
          <Text style={styles.pickImageText}>Ambil Foto</Text>
        </TouchableOpacity>
        {imageUri && (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            {/* <Button title="Upload Image" onPress={uploadImage} /> */}
          </>
        )}
        {uploading && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.checkboxContainer}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}/>
          <Text style={styles.checkboxText}>Saya setuju dengan Syarat dan Ketentuan yang berlaku</Text>
        </View>
        <TouchableOpacity style = {styles.buttonContainer} onPress={submitConfirm}>   
          <Text style = {styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

        <Image source={require('../assets/new-beginnings.png')} style={styles.image} />
      </View>
      </ScrollView>
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
  pickImageText:{
    fontSize:16,
  },
});

export default RegisterScreen;
