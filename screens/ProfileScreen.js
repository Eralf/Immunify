import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

var bgImage = '../assets/mainprofile-bg.png';

const pfp_main_temp = '../assets/mainpfptemp.png';
const pfp_parent_temp = '../assets/parentpfptemp.jpg';

const ProfileScreen = ({ navigation, route }) => {

  const boxWidth = Dimensions.get('window').width - 34;

  var pfp_main = pfp_main_temp;
  var pfp_parent = pfp_parent_temp;

  return (
    <View style={styles.container}>

      {/* MAIN PROFILE CARD */}
      <View style={{
          width: boxWidth,
          height: 136,
          marginTop: 17,
          borderRadius: 10,
          overflow: 'hidden',
          justifyContent: 'center',
      }}>

        {/* BACKGROUND */}
        <Image source={require(bgImage)} style={{position: 'absolute', width: boxWidth, height: 136, resizeMode: 'cover'}}/>
        
        {/* Profile Image */}
        <Image source = {require(pfp_main)} style={{
          position: 'absolute',
          width: 90,
          height: 136-12-12,
          marginLeft: 12,
          borderRadius: 10,
        }}/>
        
        {/* Container for profile details */}
        <View style={{
          position: 'absolute',
          height: 136-12-12,
          width: boxWidth-12-90-12-12,
          left: 12+90+12,
          // backgroundColor: 'purple',
        }}>

          <Text numberOfLines={1} ellipsizeMode="tail" style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 20,
            color: 'white',

            marginTop: 4,
          }}>
            Joshua Pieter O.
          </Text>

          <Text style={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 16,
            color: 'white',
          }}>
            Laki-laki
          </Text>

          <Text style={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 16,
            color: 'white',
          }}>
            7 Bulan
          </Text>

          <Text style={{
            position: 'absolute',
            bottom: 0,

            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 12,
            color: 'white',
          }}>
            NIK - 320**********011
          </Text>

        </View>

      </View>
      
      <Text style={{
        fontFamily: 'NunitoSans-Bold',
        fontSize: 20,
        color: 'black',

        width: boxWidth - 12*2,
        marginTop: 16,
        left: 0,
        alignItems: 'baseline',

        // backgroundColor: 'red'
      }}>
          Akun Anda
      </Text>
      {/* YOUR ACCOUNT */}
      <View style={{
          width: boxWidth,
          height: 300,
          marginTop: 6,
          borderRadius: 10,
          overflow: 'hidden',
          justifyContent: 'baseline',

          backgroundColor: 'white',
      }}>

        <View style={{
          width: boxWidth,
          height: 174,
          overflow: 'hidden',
          justifyContent: 'baseline',

          backgroundColor: 'lightgrey',
        }}>
          
          <Text numberOfLines={1} ellipsizeMode="tail" style={{
            fontFamily: 'NunitoSans-Bold',
            fontSize: 20,
            color: 'black',

            position: 'absolute',
            top: 12,
            left: 12,
          }}>
            Utama (Orang Tua)
          </Text>

          {/* Parent Profile Image */}
          <Image source = {require(pfp_parent)} style={{
            width: 90,
            height: 136-12-12,
            borderRadius: 10,

            position: 'absolute',
            top: 48,
            left: 12,
          }}/>








        </View>


      </View>

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

