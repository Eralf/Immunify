import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors';
import { useViewChild } from '../ViewChildContext';
import { useChild } from '../ChildContext';
import { useUser } from '../UserContext';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
const pfp_main_temp = '../assets/Girl.png';
const syringe = '../assets/Syringe.png';
const listPaper = '../assets/listPaper.png';
const HomeScreenTemporarily = () => {
  const navigation = useNavigation();
  const {viewChild} = useViewChild();
  const {childID, setChildID} = useChild();
  const {userID, setUserID} = useUser();
  // setChildID(viewChild[0].id);
  console.log('Current child ID:'+childID);
  console.log('Current parent ID:'+userID);
  return (
    <ScrollView>
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={styles.welcoming}>
        <View style={{flexDirection: 'column', justifyContent:'center'}}>
          <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 18}}>Selamat Datang di <Text style={{fontWeight:'bold'}}>Immunify </Text></Text>
          <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 18}}>Kelola vaksinmu di <Text style={{fontWeight:'bold'}}>satu aplikasi{'\n\n'}</Text></Text>
          <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 18}}>Mau ngapain hari ini?</Text>
        </View>
        <View>
          <Image source = {require(pfp_main_temp)} style={{
            width:100,
            height:160,
            resizeMode: 'cover'
          }}/>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('VaccinationsMissed')} style={{backgroundColor: '#EF5454',
        marginHorizontal: 20, 
        marginVertical:30, 
        borderRadius:20, 
        
        flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{justifyContent:'center',position:'relative',overflow:'hidden'}}>
          <Text style={{color:'white', fontFamily: 'NunitoSans-SemiBold', fontSize:18, marginLeft:20}}>Vaksin kamu ada yang {'\n'}bolong? <Text style={{fontWeight:'bold',fontFamily:'NunitoSans-Bold'}}>Cek sekarang</Text>
            </Text>
          {/* <View style={{backgroundColor:'#F99797', width:100, height:100,position:'absolute',
            borderRadius:50, transform: [{ scaleX: 3 }],zIndex:-1,bottom:-70,left:35}}>
            </View> */}
        </View>
        <View style={{backgroundColor:'white',width:100,
          height:(dh/5) - 70,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:20, marginVertical:10, marginRight:15
          }}>
          <Text style={{color:'red',fontSize:70,fontWeight:'bold'}}>!</Text>
        </View>

      </TouchableOpacity>
      <View style={{backgroundColor:'#A9E5FF',borderTopLeftRadius:20,borderTopRightRadius:20, position:'relative', overflow:'hidden'}}>
          <Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular',marginTop:10,fontSize: 17}}>Layanan</Text>
          <View style={{backgroundColor:'#D4F4F9', width:150, height:150,position:'absolute',
            borderRadius:75,  transform: [
              {scaleX: 5},{scaleY:2},
              {skewY:'70deg'}
            ],zIndex:-1,right:-100,top:0}}></View>
          <View style={{backgroundColor:'#D4F4F9', width:150, height:150,position:'absolute',
            borderRadius:75,  transform: [
              {scaleX: 2},{scaleY:2},
              {skewY:'40deg'}
            ],zIndex:-1, bottom:-30,left:-30}}></View>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:10,marginHorizontal:20,backgroundColor:'white',padding:20, borderRadius:10}}>
            <View>
              <Image source={require(syringe)} style={{
                width:100,
                height:100,
                resizeMode: 'contain'
              }}/>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 17}}>Mau Daftar Vaksin?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Appointment')} style={{backgroundColor:'#E7FCFF',paddingVertical:15, borderRadius:10, marginTop:10}}>
                <Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular', fontSize:17}}>Daftar Disini!</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20,marginBottom:35, marginHorizontal:20,backgroundColor:'white',padding:20,borderRadius:10}}>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 17}}>Mau Cek Sertifikat Vaksin?</Text>
              <TouchableOpacity onPress={() => {navigation.navigate('VaccinationsCompleted')}} style={{backgroundColor:'#E7FCFF',paddingVertical:15, borderRadius:10, marginTop:10,width:180}}>
                <Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular', fontSize:17}}>Cek Disini!</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Image source={require(listPaper)} style={{width:100,height:100,resizeMode: 'contain'}}/>
              {/* <Text>abc</Text> */}
            </View>
          </View>
      </View>
    </SafeAreaView>
    </ScrollView>
    // <View style={styles.container}>

    //   <Text style={styles.text}>Home Screen</Text>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('Profile')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Profile Screen
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('Login')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Login Screen
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('Announcements')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Announcements Screen
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('Appointment')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Appointment Screen
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('VaccinationsCompleted')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Completed Appointments Screen
    //     </Text>
    //   </TouchableOpacity>
      
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('VaccinationsMissed')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Missed Appointments Screen
    //     </Text>
    //   </TouchableOpacity>
      
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('VaccinationsUpcoming')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Upcoming Appointments Screen
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => navigation.navigate('VaccineDetails')}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>
    //       Vaccine Details Screen
    //     </Text>
    //   </TouchableOpacity>

    // </View>
  );
}

const styles = StyleSheet.create({
  welcoming:{
    flexDirection: 'row',
    marginHorizontal:20,
    justifyContent:'space-between'
    
  },
  textCenter:{
    alignItems: 'center'
  }
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // text: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  // },
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#9999FF',
  //   padding: 10,
  //   margin: 5,
  //   borderRadius: 5
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // }
});

export default HomeScreenTemporarily;
