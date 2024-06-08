import React from 'react';

import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnnouncementsScreen = ({ navigation, route }) => {
  
  return (
    <SafeAreaView style = {styles.container}>

      <Text style = {styles.text}>Notifikasi</Text>

      <View style = {styles.horizontalLine}></View>
      <View style={styles.navigatesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style = {styles.navigates}>
            <Text style = {styles.navigatesText}>Semua</Text>
            <Text style = {styles.navigatesText}>Mendatang</Text>
            <Text style = {styles.navigatesText}>Terlewatkan</Text>
            <Text style = {styles.navigatesText}>Selesai</Text>
          </View>
        </ScrollView>
      </View>
      <View style = {styles.horizontalLine}></View>
      
      {/* <View> */}
      <ScrollView>
      <TouchableOpacity style = {styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsMissed')}>
          <View style = {styles.wrapStatus}>
            <View style={styles.terlewatkan}>
              <Text >Terlewatkan</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style = {styles.wrapInfoTime}>
            <Text style = {styles.information}>Anda melewatkan vaksin C Tanggal 18 September 2010. <Text style={styles.boldText}>Klik untuk membuat janji baru!</Text></Text>
            <Text style = {styles.time}> 1h</Text>
          </View>
          
        </TouchableOpacity>
        <View style = {styles.horizontalLine}></View>

        <TouchableOpacity style = {styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsUpcoming')}>
          <View style = {styles.wrapStatus}>
            <View style={styles.mendatang}>
              <Text >Mendatang</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style = {styles.wrapInfoTime}>
            <Text style = {styles.information}>Anda perlu mengambil vaksin C pada Tanggal 18 Oktober 2050.  <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
            <Text style = {styles.time}> 1h</Text>
          </View>
          
        </TouchableOpacity>
        <View style = {styles.horizontalLine}></View>

        <TouchableOpacity style = {styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsCompleted')}>
          <View style = {styles.wrapStatus}>
            <View style={styles.selesai}>
              <Text >Selesai</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style = {styles.wrapInfoTime}>
            <Text style = {styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin C Tahap Pertama.  <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>
            <Text style = {styles.time}> 1h</Text>
          </View>
          
        </TouchableOpacity>
        <View style = {styles.horizontalLine}></View>

        <TouchableOpacity style = {styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsOnGoing')}>
          <View style = {styles.wrapStatus}>
            <View style={styles.berlangsung}>
              <Text >Berlangsung</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style = {styles.wrapInfoTime}>
            <Text style = {styles.information}>Anda telah membuat janji untuk vaksin C Tahap Pertama pada Tanggal 20 September 2050.  <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
            <Text style = {styles.time}> 1h</Text>
          </View>
          
        </TouchableOpacity>
        <View style = {styles.horizontalLine}></View>
      </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginLeft:20,
    // marginRight:20,
    flex:1
  },
  text: {
    fontSize: 24,
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 16,
    marginLeft:20,
    marginRight:20,
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
  },
  horizontalLine: {
    borderBottomColor: '#D5D5D5', // You can change the color here
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 16, // Adjust as needed
  },
  navigates:{
    // flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
    // marginBottom:-1
  },
  navigatesText:{
    fontFamily: 'NunitoSans-Regular',
    fontSize:18,
    marginHorizontal: 10,
    // marginBottom:16,
    paddingBottom: 16,
    // borderBottomWidth:1,
    // borderColor:'#72D3FE'
  },
  terlewatkan:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    backgroundColor: '#EF5454',
    padding:10,
    width:110,
    alignItems:'center',
    justifyContent:'center',
    
    borderRadius:15
  },
  mendatang:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    backgroundColor: '#84D9FE',
    padding:10,
    width:110,
    alignItems:'center',
    justifyContent:'center',
    
    borderRadius:15
  },
  selesai:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    backgroundColor: '#3BDC02',
    padding:10,
    width:110,
    alignItems:'center',
    justifyContent:'center',
    
    borderRadius:15
  },
  berlangsung:{
    fontFamily: 'NunitoSans-SemiBold',
    fontSize:14,
    backgroundColor: '#FFC965',
    padding:10,
    width:110,
    alignItems:'center',
    justifyContent:'center',
    
    borderRadius:15
  },
  redDot:{
    backgroundColor: '#FF0000',
    width:15,
    height:15,
    borderRadius:10
  },
  wrapAnnounce:{
    marginHorizontal:20,
    marginBottom:16
  },
  wrapStatus:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    // marginHorizontal:20,
    marginBottom:16
  },
  wrapInfoTime:{
    justifyContent: 'space-between',
    flexDirection:'row',
    // marginHorizontal:20
    marginBottom:16,
    fontSize:14,
    fontFamily: 'NunitoSans-Regular'
  },
  information:{
    flex:2
  },
  time:{
    flex:1,
    textAlign:'right'
  },
  boldText:{
    fontFamily: 'NunitoSans-Bold'
  }
});

export default AnnouncementsScreen;

