import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, collection, doc, getDocs } from '../firebasecfg';

import { useProfiles } from '../ProfileContext';

import ImageDisplay from '../ImageViewer';

const English = require('../languages/English.json');



var bgImage = '../assets/mainprofile-bg.png';

const pfp_main_temp = '../assets/pfp/mainpfptemp.png';
const pfp_parent_temp = '../assets/pfp/parentpfptemp.jpg';

var selectedProfile_index = 0;
var parentProfile_index = 0;

const margin_outside = 17;
const margin_inside = 12;

const boxWidth = Dimensions.get('window').width - 2*margin_outside;

const height_mainProfileCard = 136;
const height_yourAccountCard = 380;

const br_bigCard = 10; // border radius

const ProfileScreen = ({ route }) => {

  // const { profile } = route.params;

  const { profiles } = useProfiles();

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [childrenProfiles, setChildrenProfiles] = useState([]);

  useEffect(() => {
    if (profiles && profiles.length > 0) {
      const parent = profiles[parentProfile_index];
      setParentProfile(parent);
      fetchChildrenProfiles(parent.id);
    }
  }, [profiles]);


  const fetchChildrenProfiles = async (parentId) => {
    try {
      const childrenCollectionRef = collection(db, 'profiles', parentId, 'children');
      const childrenCollection = await getDocs(childrenCollectionRef);
      const childrenData = childrenCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChildrenProfiles(childrenData);
      if (childrenData.length > 0) {
        setSelectedProfile(childrenData[selectedProfile_index]);
      }
    } catch (error) {
      console.error("Error fetching children profiles: ", error);
    }
  };

  if (!profiles || profiles.length === 0 || !selectedProfile || !parentProfile) {
    return <Text>Loading...</Text>;
  };

  var pfp_main = '../assets/pfp/' + selectedProfile.picture;
  var pfp_parent = '../assets/pfp/' + parentProfile.picture;
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
      return `${years} years and ${months} months old`;
    } else if (years === 1) {
      return `${years} year and ${months} months old`;
    } else if (years > 0) {
      return `${months} months and ${days} days old`;
    } else {
      return `${days} days old`;
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
      return "Male";
    return "Female";
  }

  return (
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
        <Image source = {{uri:pfp_main}} style={{
          position: 'absolute',
          width: 90,
          height: height_mainProfileCard-2*margin_inside,
          marginLeft: margin_inside,
          borderRadius: br_bigCard,
        }}/>
        
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
          {English[0].your_account}
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
            {English[0].parent}
          </Text>

          {/* Parent Profile Image */}
          <Image source = {{uri:pfp_parent}} style={{
            width: 90,
            height: height_mainProfileCard-2*margin_inside,
            borderRadius: br_bigCard,

            position: 'absolute',
            top: 48,
            left: margin_inside,
          }}/>

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
            {English[0].children}
          </Text>

          <ScrollView horizontal={true} style={{
            width: boxWidth,
            height: height_yourAccountCard-174-2*margin_inside,
            top: 48,
            left: margin_inside,
          }}>
            <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={true}/>
            <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={false}/>
            <ChildCard child={selectedProfile} isSelected={false}/>
            <ChildCard child={parentProfile} isSelected={false}/>
            <ChildCard child={selectedProfile} isSelected={false}/>

            {/* spacer */}
            <View style={{width: margin_inside}}></View>
          </ScrollView>

        </View>
        


      </View>

    </View>
  );
}

const ChildCard = ({child, isSelected}) => {
  var boxWidth;
  if(isSelected) boxWidth = 90;
  else boxWidth = 70;

  return (
    <View style={{
      width: boxWidth,
      height: boxWidth+40,
      // backgroundColor: 'purple',
      // marginLeft: margin_inside,
      marginRight: margin_inside,
      alignItems: 'center',
    }}>
      <Image source = {require(pfp_main_temp)} style={{
        width: boxWidth,
        height: boxWidth,
        borderRadius: br_bigCard,

        position: 'absolute',
        top: 0
      }}/>
      <Text numberOfLines={2} ellipsizeMode="clip" style={{
        fontFamily: 'NunitoSans-Bold',
        fontSize: 12,
        color: 'black',
        position: 'absolute',
        textAlign: 'center',
        bottom: 0
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

