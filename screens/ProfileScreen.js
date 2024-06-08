import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const English = require('../languages/English.json');



var bgImage = '../assets/mainprofile-bg.png';

const pfp_main_temp = '../assets/mainpfptemp.png';
const pfp_parent_temp = '../assets/parentpfptemp.jpg';

var selectedProfile_index = 1;
var parentProfile_index = 2;

const margin_outside = 17;
const margin_inside = 12;

const boxWidth = Dimensions.get('window').width - 2*margin_outside;

const height_mainProfileCard = 136;
const height_yourAccountCard = 360;

const br_bigCard = 10; // border radius

const ProfileScreen = ({ route }) => {

  const { profile } = route.params;
  const selectedProfile = profile[selectedProfile_index];
  const parentProfile = profile[parentProfile_index];

  var pfp_main = pfp_main_temp;
  var pfp_parent = pfp_parent_temp;

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
        <Image source = {require(pfp_main)} style={{
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
            {English[0].sex[selectedProfile.sex]}
          </Text>

          <Text style={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 16,
            color: 'white',
          }}>
            7 Months
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
            {English[0].main_parent}
          </Text>

          {/* Parent Profile Image */}
          <Image source = {require(pfp_parent)} style={{
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
              {English[0].sex[parentProfile.sex]}
            </Text>

            <Text style={{
              fontFamily: 'NunitoSans-SemiBold',
              fontSize: 16,
              color: 'black',
            }}>
              42 Years
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

        {/* CHILDREN */}
        <View style={{
          width: boxWidth,
          height: height_yourAccountCard-174,
          overflow: 'hidden',
          justifyContent: 'baseline',

          backgroundColor: 'pink',
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
            top: 48
          }}>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
            <ChildCard child={selectedProfile}/>
          </ScrollView>

        </View>
        


      </View>

    </View>
  );
}

const ChildCard = ({child}) => {
  return (
    <View style={{
      width: 70,
      height: 100,
      backgroundColor: 'purple',
      marginLeft: margin_inside,
      alignItems: 'center',
    }}>
      <Image source = {require(pfp_main_temp)} style={{
        width: 50,
        height: 50,
        borderRadius: br_bigCard,

        position: 'absolute',
        top: 0
      }}/>
      <Text style={{
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

