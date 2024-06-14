import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Foundation } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VaccinationsUpcomingScreen = ({ navigation, route }) => {
  const [menu] = useState();
  const {fontScale} = useWindowDimensions();
  return (
    <View>
      <View style={styles.pickerFrame}>
        <View style={styles.pickerContainer}>
            <Picker
            mode='dropdown'
            selectedValue={menu}
            onValueChange={(itemValue) => navigation.navigate(itemValue)}
            >
              <Picker.Item label="Mendatang" value="VaccinationsUpcoming" style={styles.text}/>
              <Picker.Item label="Terlewatkan" value="VaccinationsMissed" style={styles.text}/>
              <Picker.Item label="Selesai" value="VaccinationsCompleted" style={styles.text}/>
              <Picker.Item label="Berlangsung" value="VaccinationsOnGoing" style={styles.text}/>
            </Picker>
            <View style={styles.pickerContainerGradient}>
            </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentLine}>
          </View>
          <Text style={styles.appointmentText(fontScale)}>
            Hepatitis B
          </Text>
          <Text style={styles.appointmentTextDate(fontScale)}>
            11/02/2022
          </Text>
          <View style={styles.appointmentContainerGradient}>
          </View>
          <View style={styles.infoIconContainer}>
            <Foundation name="info" size={windowWidth*0.067} color="black" style={styles.infoIcon}/>
          </View>
        </View>
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentLine}>
          </View>
          <Text style={styles.appointmentText(fontScale)}>
            Polio
          </Text>
          <Text style={styles.appointmentTextDate(fontScale)}>
            12/03/2022
          </Text>
          <View style={styles.appointmentContainerGradient}>
          </View>
          <View style={styles.infoIconContainer}>
            <Foundation name="info" size={windowWidth*0.067} color="black" style={styles.infoIcon}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontFamily: 'NunitoSans-Light',
    marginBottom: 16,
  },
  appointmentText: (fontScale) => [{
    fontSize: 20/fontScale,
    fontFamily: 'NunitoSans-Medium',
    marginBottom: 4,
    left:25,
    top:3,
  }],
  appointmentTextDate: (fontScale) => [{
    fontSize: 16/fontScale,
    fontFamily: 'NunitoSans-Medium',
    marginBottom: 4,
    left:25,
    top:3,
  }],
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
  pickerFrame: {
    marginBottom: 10,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    height: windowWidth*0.1,
    width: windowWidth*0.9,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(169,229,255)',
    // position: 'absolute',
    lineHeight: 100,
    padding: 10,
    marginBottom: 10,
    overflow:'hidden',
  },
  pickerContainerGradient:{
    width: windowWidth*0.4,
    height: windowWidth*0.25,
    backgroundColor: 'rgb(114,211,254)',
    borderRadius: 50,
    transform: [
      {scaleX: 2.7},
      {rotate: '-45deg'}
    ],
    position:'absolute',
    right:13,
    top:10,
    zIndex:-1,
  },
  appointmentContainer:{
    justifyContent: 'center',
    width: windowWidth*0.85,
    height: windowWidth*0.22,
    borderRadius: 10,
    backgroundColor: 'rgb(169,229,255)',
    position: 'relative',
    marginTop: 20,
    marginBottom: 16,
    overflow:'hidden',
  },
  appointmentContainerGradient:{
    width: windowWidth*0.25,
    height: windowWidth*0.25,
    backgroundColor: 'rgb(114,211,254)',
    borderRadius: 50,
    transform: [
      {scaleX: 2.7},
      {rotate: '-30deg'}
    ],
    position:'absolute',
    right:0,
    top:40,
  },
  appointmentLine:{
    borderLeftColor:'black',
    borderLeftWidth:1,
    height:windowWidth*0.17,
    position:'absolute',
    left:10,
  },
  infoIconContainer:{
    width:windowWidth*0.05,
    height:windowWidth*0.05,
    borderRadius:windowWidth*0.2,
    right:15,
    position:'absolute',
    backgroundColor:'rgb(255,255,255)',
    zindex:2,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  infoIcon:{
    position:'absolute',
    zIndex:10,
  },
});

export default VaccinationsUpcomingScreen;

