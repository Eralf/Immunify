import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors';

const pfp_main_temp = '../assets/Girl.png';
const syringe = '../assets/Syringe.png';
const listPaper = '../assets/listPaper.png';
const HomeScreen = ({ navigation, route }) => {
  return (
    // <ScrollView>
    // <SafeAreaView style={{backgroundColor:'white'}}>
    //   <View style={styles.welcoming}>
    //     <View style={{flexDirection: 'column', justifyContent:'center'}}>
    //       <Text style={{fontFamily: 'NunitoSans-Regular'}}>Selamat Datang di <Text style={{fontWeight:'bold'}}>Immunify </Text></Text>
    //       <Text style={{fontFamily: 'NunitoSans-Regular'}}>Kelola vaksinmu di <Text style={{fontWeight:'bold'}}>satu aplikasi{'\n\n'}</Text></Text>
    //       <Text>Mau ngapain hari ini?</Text>
    //     </View>
    //     <View>
    //       <Image source = {require(pfp_main_temp)} style={{
    //         width:100,
    //         height:160,
    //         resizeMode: 'cover'
    //       }}/>
    //     </View>
    //   </View>
    //   <View style={{backgroundColor: '#EF5454',
    //     marginHorizontal: 20, 
    //     marginVertical:30, 
    //     borderRadius:20, 
    //     paddingHorizontal: 20,
    //     paddingVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
    //     <View style={{justifyContent:'center'}}>
    //       <Text style={{color:'white', fontFamily: 'NunitoSans-SemiBold', fontSize:16}}>Vaksin kamu ada yang {'\n'}bolong? <Text style={{fontWeight:'bold',fontFamily:'NunitoSans-Bold'}}>Cek sekarang</Text></Text>
    //     </View>
    //     <View style={{backgroundColor:'white',width:100,
    //       height:100,
    //       justifyContent:'center',
    //       alignItems:'center',
    //       borderRadius:20
    //       }}>
    //       <Text style={{color:'red',fontSize:70,fontWeight:'bold'}}>!</Text>
    //     </View>

    //   </View>
    //   <View style={{backgroundColor:'#A9E5FF',borderTopLeftRadius:20,borderTopRightRadius:20}}>
    //       <Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular',marginTop:10}}>Servis</Text>
    //       <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:10,marginHorizontal:20,backgroundColor:'white',padding:20}}>
    //         <View>
    //           <Image source={require(syringe)} style={{
    //             width:100,
    //             height:100,
    //             resizeMode: 'contain'
    //           }}/>
    //         </View>
    //         <View style={{justifyContent:'center'}}>
    //           <Text style={{fontFamily: 'NunitoSans-Regular'}}>Mau Daftar Vaksin?</Text>
    //           <TouchableOpacity style={{backgroundColor:'#E7FCFF',paddingVertical:15, borderRadius:10, marginTop:10}}><Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular'}}>Daftar Disini!</Text></TouchableOpacity>
    //         </View>
    //       </View>
    //       <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:10,marginHorizontal:20,backgroundColor:'white',padding:20}}>
    //         <View style={{justifyContent:'center'}}>
    //           <Text style={{fontFamily: 'NunitoSans-Regular'}}>Mau Cek Sertifikat Vaksin?</Text>
    //           <TouchableOpacity style={{backgroundColor:'#E7FCFF',paddingVertical:15, borderRadius:10, marginTop:10,width:150}}><Text style={{textAlign:'center',fontFamily: 'NunitoSans-Regular'}}>Cek Disini!</Text></TouchableOpacity>
    //         </View>

    //         <View>
    //           <Image source={require(listPaper)} style={{width:100,height:100,resizeMode: 'contain'}}/>
    //           {/* <Text>abc</Text> */}
    //         </View>
    //       </View>
    //   </View>
    // </SafeAreaView>
    // </ScrollView>
    <View style={styles.container}>

      <Text style={styles.text}>Home Screen</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Profile Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Login Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Announcements')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Announcements Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Appointment')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Appointment Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsCompleted')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Completed Appointments Screen
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsMissed')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Missed Appointments Screen
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsUpcoming')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Upcoming Appointments Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('VaccineDetails')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Vaccine Details Screen
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  // welcoming:{
  //   flexDirection: 'row',
  //   marginHorizontal:20,
  //   justifyContent:'space-between'
    
  // },
  // textCenter:{
  //   alignItems: 'center'
  // }
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#9999FF',
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default HomeScreen;
