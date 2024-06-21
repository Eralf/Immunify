import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, collection, doc, getDocs, storage } from '../firebasecfg';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { useProfiles } from '../ProfilesContext';
// import { useSelectedProfile } from '../SelectedProfileContext';

import ImageDisplay from '../ImageViewer';
import { useChild } from '../ChildContext';
import { useUser } from '../UserContext';

const English = require('../languages/English.json');



const bgImage = '../assets/mainprofile-bg.png';
const addChildPopupBgImage = '../assets/addchild_popup_bg.png';
const pfpIcon = '../assets/Girl.png';

const pfp_main_temp = '../assets/pfp/mainpfptemp.png';
const pfp_parent_temp = '../assets/pfp/parentpfptemp.jpg';

var addchild_button = '../assets/addchild_button.png';

// var selectedProfile_index = 0;
var parentProfile_index = 0;

const margin_outside = 17;
const margin_inside = 12;

const boxWidth = Dimensions.get('window').width - 2*margin_outside;
const boxHeight = Dimensions.get('window').height;

const height_mainProfileCard = 136;
const height_yourAccountCard = 380;

const br_bigCard = 10; // border radius

const ProfileScreen = ({ route }) => {

  // const { profile } = route.params;

  const { profiles } = useProfiles();
  const {childID, setChildID} = useChild();
  const {userID, setUserID} = useUser();

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [childrenProfiles, setChildrenProfiles] = useState({});
  
  const [modalVisible, setModalVisible] = useState(false);

  const [childName, setChildName] = useState('');
  const [childDOB, setChildDOB] = useState(new Date);
  const [childNIK, setChildNIK] = useState('');
  const [childGender, setChildGender] = useState(false);
  const [childPicture, setChildPicture] = useState(false);
  const [children, setChildren] = useState([]);

  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(null);
  
  const [showDatePicker, setShowDatePicker] = useState(false);

  
  const navigation = useNavigation();

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

  const uploadImage = async () => {
    if (!imageUri) return;

    setUploading(true);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = childName+'_'+childNIK+'_PFP';

    const storageRef = ref(storage, `images/profilePictures/childPFP/${filename}`);
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

  // const handleAddChild = async () => {
  //   if (childName && childDOB) {
  //     setChildren([...children, { name: childName, age: childDOB }]);
  //     setChildName('');
  //     setChildDOB(childDOB);
  //     setChildNIK('');
  //     setChildGender('');
  //     setModalVisible(false);
  //   } else {
      
  //   }
  //   uploadImage();
  //   if(!uploading){
  //     addDoc(collection(db, "profiles", parentProfile.id, "child"), {
  //       name: childName,
  //       picture: 'gs://immunify-5c493.appspot.com/images/profilePictures/childPFP/'+childName+'_'+childNIK+'_PFP',
  //       dob:childDOB,
  //       sex:childGender,
  //       nik:childNIK,
  //     }).then(() => {
  //       navigation.navigate('Profile');
  //       console.log('Profile added successfully');
  //     }).catch((error) => {
  //       console.error('Error adding child: ', error);
  //     });
  //   }



  //   try {
  //     const childrenCollectionRef = collection(db, 'profiles', parentProfile.id, 'child');
  //     const childrenCollection = await getDocs(childrenCollectionRef);
  //     const childrenData = childrenCollection.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     setChildrenProfiles(childrenData);
  //     if (childrenData.length > 0) {
  //       setSelectedProfile(childrenData[selectedChild]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching children profiles: ", error);
  //   }
  // };

  const handleAddChild = async () => {
    if (childName && childDOB) {
      setChildren([...children, { name: childName, age: childDOB }]);
      // clear input
      setChildName('');
      setChildDOB(new Date);
      setChildNIK('');
      setChildGender(false);
      setModalVisible(false);
  
      try {
        const imageUrl = await uploadImage();
  
        if (!uploading) {
          await addDoc(collection(db, "profiles", parentProfile.id, "child"), {
            name: childName,
            picture: `gs://immunify-5c493.appspot.com/images/profilePictures/childPFP/${childName}_${childNIK}_PFP`,
            dob: childDOB,
            sex: childGender,
            nik: childNIK,
          });
          
          console.log('Profile added successfully');
  
          const childrenCollectionRef = collection(db, 'profiles', parentProfile.id, 'child');
          const childrenCollection = await getDocs(childrenCollectionRef);
          const childrenData = childrenCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setChildrenProfiles(childrenData);
  
          if (childrenData.length > 0) {
            for (var i = 0; i < childrenData.length; i++) {
              if (childrenData[i].id === childID) {
                setSelectedProfile(childrenData[i]);
                break;
              }
            }
            // setSelectedProfile(childrenData[selectedChild]);
          }
  
          navigation.navigate('Profile');
        }
      } catch (error) {
        console.error('Error adding child: ', error);
      }
    } else {
      console.error('Child name and date of birth are required.');
    }
  };
  


  const [selectedChild, setSelectedChild] = useState(childID);
  const handleSelectChild = async (childId) => {
    // console.log("Child id from card:"+childId);
    // fetchChildrenProfiles(parentProfile.id);

    try {
      const childrenCollectionRef = collection(db, 'profiles', parentProfile.id, 'child');
      const childrenCollection = await getDocs(childrenCollectionRef);
      const childrenData = childrenCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChildrenProfiles(childrenData);
      if (childrenData.length > 0) {
        for(var i=0; i<childrenData.length; i++) {

          if(childrenData[i].id === childId){
            setSelectedProfile(childrenData[i]);
            setSelectedChild(childId);
            setChildID(childrenData[i].id);
            // console.log("theo ganteng");
            // console.log(childrenData[i]);
            break;
          }
        }
        // setSelectedProfile(childrenData[selectedChild]);
        // setChildID(childID);
        // console.log(childrenData);
      }
    } catch (error) {
      console.error("Error fetching children profiles: ", error);
    }


    setSelectedChild(childId);
    for(var i=0; i<childrenProfiles.length; i++) {
      if(childrenProfiles[i].id === childId){
        setSelectedProfile(childrenProfiles[i]);
        break;
      }
    };
    // setSelectedProfile(childrenProfiles[childID]);
  };




  useEffect(() => {
    if (profiles && profiles.length > 0) {
      const parent = profiles[parentProfile_index];
      setParentProfile(parent);
      fetchChildrenProfiles(parent.id);
    }
  }, [profiles]);


  const fetchChildrenProfiles = async (parentId) => {
    try {
      const childrenCollectionRef = collection(db, 'profiles', parentId, 'child');
      const childrenCollection = await getDocs(childrenCollectionRef);
      const childrenData = childrenCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChildrenProfiles(childrenData);
      if (childrenData.length > 0) {
        for (var i = 0; i < childrenData.length; i++) {
          if (childrenData[i].id === childID) {
            setSelectedProfile(childrenData[i]);
            break;
          }
        }
        // setSelectedProfile(childrenData[selectedChild]);
      }
    } catch (error) {
      console.error("Error fetching children profiles: ", error);
    }
  };

  if (!profiles || profiles.length === 0 || !selectedProfile || !parentProfile) {
    
    console.log("AAA")
    console.log(!profiles);
    console.log(profiles.length);
    console.log("selectedprofile:", selectedProfile);
    console.log("selectedchild:"+ selectedChild+"...");
    console.log(!parentProfile);
    console.log("BBB")
    return <Text>Loading...</Text>;
  };

  var pfp_main = selectedProfile.picture;
  var pfp_parent = parentProfile.picture;
  // var pfp_main = pfp_main_temp;
  // var pfp_parent = pfp_parent_temp;


  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = dob.toDate();
    var years = today.getFullYear() - birthDate.getFullYear();
    var months = today.getMonth() - birthDate.getMonth();
    var days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months = months - 1;
      days = days + daysInPreviousMonth(today.getMonth, today.getFullYear);
    }
    if (months < 0) {
        years = years - 1;
        months = months + 12;
    }

    if (years > 1) {
      return `${years} Tahun ${months} Bulan`;
    } else if (years === 1) {
      return `${years} Tahun ${months} Bulan`;
    } else if (years >= 0) {
      return `${months} Bulan ${days} Hari`;
    } else {
      return `${days} Hari`;
    }
  }
  const daysInPreviousMonth = (month, year) => {
    if (month == 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
            return 29; // Leap year
        else
            return 28;
    }
    else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31;
    }
    else {
        return 30;
    }
  }

  const getSex = (sex) => {
    if(!sex)
      return "Laki-laki";
    return "Perempuan";
  }


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const today = new Date();
    if (currentDate > today.setHours(0, 0, 0, 0)) {
      Alert.alert("Error", "Tanggal tidak boleh setelah waktu sekarang.");
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setChildDOB(currentDate);
  };
  



  return (
    <ScrollView>
    <View style={styles.container}>

      {/* MAIN PROFILE CARD */}
      <View style={{
          width: boxWidth,
          height: height_mainProfileCard,
          marginTop: margin_outside,
          borderRadius: br_bigCard,
          overflow: 'hidden',
          justifyContent: 'center',
      }}>

        {/* BACKGROUND */}
        <Image source={require(bgImage)} style={{position: 'absolute', width: boxWidth, height: height_mainProfileCard, resizeMode: 'cover'}}/>
        
        {/* Profile Image */}
        {/* <Image source = {{uri:pfp_main}} style={{
          position: 'absolute',
          width: 90,
          height: height_mainProfileCard-2*margin_inside,
          marginLeft: margin_inside,
          borderRadius: br_bigCard,
        }}/> */}
        
        <View style={{
            position: 'absolute',
            width: 90,
            height: height_mainProfileCard-2*margin_inside,
            marginLeft: margin_inside,
            borderRadius: br_bigCard,

            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {/* <Text>{selectedProfile.picture}</Text> */}
            <ImageDisplay imagePath={selectedProfile.picture} height={height_mainProfileCard-2*margin_inside} width={90} scaleMode={'fill'}/>
          </View>
        
        {/* Container for profile details */}
        <View style={{
          position: 'absolute',
          height: height_mainProfileCard-2*margin_inside,
          width: boxWidth-90 - 3*margin_inside,
          left: 90+2*margin_inside,
          // backgroundColor: 'purple',
        }}>

          <Text numberOfLines={1} ellipsizeMode="tail" style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 20,
            color: 'white',
            
            marginTop: 4,
          }}>
            {selectedProfile.name}
          </Text>

          <Text style={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 16,
            color: 'white',
          }}>
            {getSex(selectedProfile)}
          </Text>

          <Text style={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 16,
            color: 'white',
          }}>
            {calculateAge(selectedProfile.dob)}
          </Text>

          <Text style={{
            position: 'absolute',
            bottom: 0,

            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 14,
            color: 'white',
          }}>
            NIK - {selectedProfile.nik}
          </Text>

        </View>

      </View>
      
      <Text style={{
        fontFamily: 'NunitoSans-Bold',
        fontSize: 20,
        color: 'black',

        width: boxWidth - 2*margin_inside,
        marginTop: 20,
        left: 0,
        alignItems: 'baseline',
      }}>
          {/* {English[0].your_account} */}
          Akun Anda
      </Text>
      {/* YOUR ACCOUNT */}
      <View style={{
          width: boxWidth,
          height: height_yourAccountCard,
          marginTop: 6,
          borderRadius: br_bigCard,
          overflow: 'hidden',
          justifyContent: 'baseline',

          backgroundColor: 'white',
      }}>
        {/* PARENT */}
        <View style={{
          width: boxWidth,
          height: 174,
          overflow: 'hidden',
          justifyContent: 'baseline',

          // backgroundColor: 'lightgrey',
        }}>
          
          <Text numberOfLines={1} ellipsizeMode="tail" style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 20,
            color: 'black',

            position: 'absolute',
            top: margin_inside,
            left: margin_inside,
          }}>
            {/* {English[0].parent} */}
            Orang tua
          </Text>

          {/* Parent Profile Image */}
          {/* <Image source = {{uri:pfp_parent}} style={{
            width: 90,
            height: height_mainProfileCard-2*margin_inside,
            borderRadius: br_bigCard,

            position: 'absolute',
            top: 48,
            left: margin_inside,
          }}/> */}
          <View style={{
            width: 90,
            height: height_mainProfileCard-2*margin_inside,
            borderRadius: br_bigCard,
            resizeMode: 'cover',

            position: 'absolute',
            top: 48,
            left: margin_inside,

            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <ImageDisplay imagePath={parentProfile.picture} height={height_mainProfileCard-2*margin_inside} width={90} scaleMode={'fill'}/>
          </View>


          {/* Container for profile details */}
          <View style={{
            position: 'absolute',
            height: height_mainProfileCard-2*margin_inside,
            width: boxWidth-90 - 3*margin_inside,
            top: 48,
            left: 90+2*margin_inside,
            // backgroundColor: 'purple',
          }}>

            <Text numberOfLines={1} ellipsizeMode="tail" style={{
              fontFamily: 'NunitoSans-Bold',
              fontSize: 20,
              color: 'black',
              
              marginTop: 4,
            }}>
              {parentProfile.name}
            </Text>

            <Text style={{
              fontFamily: 'NunitoSans-SemiBold',
              fontSize: 16,
              color: 'black',
            }}>
              {getSex(parentProfile.sex)}
            </Text>

            <Text style={{
              fontFamily: 'NunitoSans-SemiBold',
              fontSize: 16,
              color: 'black',
            }}>
              {calculateAge(parentProfile.dob)}
            </Text>

            <Text style={{
              position: 'absolute',
              bottom: 0,

              fontFamily: 'NunitoSans-SemiBold',
              fontSize: 14,
              color: 'black',
            }}>
              NIK - {parentProfile.nik}
            </Text>

          </View>

        </View>

            
        {/* LINE */}
        <View style={{
            width: boxWidth-2*margin_inside,
            height: 3,
            backgroundColor: 'black',
            marginLeft: margin_inside,
            marginTop: 10,
        }}>
        </View>

        {/* CHILDREN */}
        <View style={{
          width: boxWidth,
          height: height_yourAccountCard-174,
          marginTop: 6,
          overflow: 'hidden',
          justifyContent: 'baseline',

          backgroundColor: 'white',
          borderRadius: br_bigCard
        }}>
          
          <Text numberOfLines={1} ellipsizeMode="tail" style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 20,
            color: 'black',

            position: 'absolute',
            top: margin_inside,
            left: margin_inside,
          }}>
            {/* {English[0].children} */}
            Anak-anak
          </Text>

          <ScrollView horizontal={true} style={{
            width: boxWidth,
            height: height_yourAccountCard-174-2*margin_inside,
            top: 48,
            left: margin_inside,
          }}>
            {/* <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={true}/>
            <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={false}/>
            <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={false}/>
            <ChildCard child={selectedProfile} isSelected={false}/> */}



            {/* Children */}
            {childrenProfiles.map((child, index) => (
              <ChildCard
                key={index}
                child={child}
                onSelect={() => handleSelectChild(child.id)}
                selected={childID}
              />
            ))}

            {/* Add Child */}
            <View style={{
              width: 70,
              height: 70+40,
              marginRight: margin_inside,
              borderRadius: br_bigCard,
              overflow: 'hidden',
            }}>
              <TouchableOpacity
                style={{width: 70, height: 70, borderRadius: br_bigCard, overflow: 'hidden'}}
                onPress={() => setModalVisible(true)}
              >
                <Image source={require(addchild_button)} style={{width: 70, height: 70}}/>
              </TouchableOpacity>
              <Text style={{
                fontFamily: 'NunitoSans-Bold',
                fontSize: 12,
                textAlign: 'center',
                marginTop: 5,
              }}>
                Add Child
              </Text>
            </View>

            {/* spacer */}
            <View style={{width: margin_inside}}></View>
          </ScrollView>
          
          

          {/* POPUP */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
              <View style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                width: '80%',
                maxWidth: 400,
              }}>
                <Text style={{ marginBottom: 20, textAlign: 'center', fontFamily: 'NunitoSans-SemiBold', fontSize: 20 }}>Tambahkan Anak</Text>
                <TextInput
                  placeholder="Nama Anak"
                  value={childName}
                  onChangeText={setChildName}
                  style={{
                    height: 45,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    marginBottom: 15,
                    paddingLeft: 10,
                    width: '100%',
                    borderRadius: 10,
                    fontFamily: 'NunitoSans-SemiBold',
                  }}
                />

                <View style={{
                  width: '100%',
                  height: 45,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  marginBottom: 15,
                  paddingLeft: 10,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: '100%', alignItems: 'baseline', justifyContent: 'center' }}>
                    <TextInput
                      style={{
                        fontFamily: 'NunitoSans-SemiBold',
                        fontSize: 16,
                        color: '#333',
                      }}
                      placeholder="Tanggal Lahir"
                      value={"Masukkan DOB: " + childDOB.toLocaleDateString()}
                      editable={false}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={childDOB}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                </View>

                <View style={{
                  width: '100%',
                  height: 45,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  marginBottom: 15,
                  paddingLeft: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                  <Picker
                    selectedValue={childGender}
                    onValueChange={(itemValue) => setChildGender(itemValue)}
                    style={{ height: '100%' }}
                  >
                    <Picker.Item label="Laki-laki" value={false} />
                    <Picker.Item label="Perempuan" value={true} />
                  </Picker>
                </View>

                <TouchableOpacity
                  onPress={selectImage}
                  style={{
                    height: 45,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    marginBottom: 15,
                    // paddingLeft: 10,
                    width: '100%',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Text style={{ fontFamily: 'NunitoSans-Medium', color: '#333' }}>Pilih Foto Profil</Text>
                </TouchableOpacity>

                <TextInput
                  placeholder="NIK Anak"
                  value={childNIK}
                  onChangeText={setChildNIK}
                  style={{
                    height: 45,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 10,
                    width: '100%',
                    borderRadius: 10,
                    fontFamily: 'NunitoSans-Medium',
                  }}
                  keyboardType="numeric"
                />
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity style={{ marginRight: 10, flex: 1 }} onPress={handleAddChild}>
                    <View style={{
                      backgroundColor: '#3399ff',
                      padding: 10,
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                      <Text style={{ color: 'white', fontFamily: 'NunitoSans-Bold' }}>Add Child</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10, flex: 1 }} onPress={() => { setChildDOB(new Date()); setModalVisible(false); }}>
                    <View style={{
                      backgroundColor: '#f44336',
                      padding: 10,
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                      <Text style={{ color: 'white', fontFamily: 'NunitoSans-Bold' }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>




        </View>
        


      </View>

      {/* erm what the sigma */}
      <View style={{
        width: boxWidth,
        // height: boxHeight - height_mainProfileCard - height_yourAccountCard - 3*margin_outside - 20 - 70*2 - 24,
        height: 200,
        marginTop: 20,
        borderRadius: br_bigCard,
        alignItems: 'baseline',
        backgroundColor: 'white',
      }}>
        <Text style={{
          fontFamily: 'NunitoSans-Bold',
          fontSize: 20,
          marginTop: 20,
          color: 'black',
          // marginLeft: margin_inside,
          width: boxWidth,
          textAlign: 'center',
        }}>
          Pengaturan
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginLeft: margin_inside,
        }}>
          <Image source={require('../assets/language logo_black.png')} style={{ width: 24, height: 24 }} />
          <Text style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 16,
            marginLeft: 10,
            color: 'black',
          }}>
            Bahasa Indonesia
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginLeft: margin_inside,
        }}>
          <Image source={require('../assets/customer_service_icon.png')} style={{ width: 24, height: 24 }} />
          <Text style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 16,
            marginLeft: 10,
            color: 'black',
          }}>
            Customer Service
          </Text>
        </View>
        

        <View style={{
            position: 'absolute',
            bottom: margin_inside,
            right: margin_inside,

            backgroundColor: '#aa0000',
            borderRadius: 10,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
            width: 90,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 16,
            color: 'white',
            }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>

    </View>

    <View style={{height: margin_outside}}></View>

    </ScrollView>
  );
}

const ChildCard = ({child, selected, onSelect}) => {
  var boxWidth;
  // console.log("childID:", child.id);
  // console.log("selected:", selected);
  if(child.id === selected) {
    boxWidth = 90;
  }
  else {
    boxWidth = 70;
  }

  return (
    <View style={{
      width: boxWidth,
      height: boxWidth+40,
      // backgroundColor: 'purple',
      // marginLeft: margin_inside,
      marginRight: margin_inside,
      alignItems: 'center',
    }}>
      <TouchableOpacity style={{
        width: boxWidth,
        height: boxWidth,
        borderRadius: br_bigCard,

        position: 'absolute',
        top: 0,
        
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
        onPress={onSelect}
      >
        <ImageDisplay imagePath={child.picture} height={boxWidth} width={boxWidth} scaleMode={'fill'}/>
      </TouchableOpacity>

        
      <Text numberOfLines={2} ellipsizeMode="clip" style={{
        fontFamily: 'NunitoSans-Bold',
        fontSize: 12,
        color: 'black',
        position: 'absolute',
        textAlign: 'center',
        top: boxWidth + 5,
      }}>
        {child.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'baseline',
  },
});

export default ProfileScreen;

