import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, useWindowDimensions} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Foundation } from '@expo/vector-icons';
import { useCompletedAppointments } from '../CompletedAppointmentsContext';
import ImageDisplay from '../ImageViewer';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VaccinationsCompletedScreen = ({ navigation, route }) => {
  const [menu] = useState();
  const {fontScale} = useWindowDimensions();
  // console.log(windowWidth)
  // console.log(windowHeight)
  const {completedAppointments} = useCompletedAppointments();
  return (
    <View>
      <View style={styles.pickerFrame}>
        <View style={styles.pickerContainer}>
            <View style={styles.pickerContainerGradient}>
            </View>
            <Picker
            mode='dropdown'
            selectedValue={menu}
            onValueChange={(itemValue) => navigation.navigate(itemValue)}
            >
              <Picker.Item label="Selesai" value="VaccinationsCompleted" style={styles.text}/>
              <Picker.Item label="Terlewatkan" value="VaccinationsMissed" style={styles.text}/>
              <Picker.Item label="Mendatang" value="VaccinationsUpcoming" style={styles.text}/>
              <Picker.Item label="Berlangsung" value="VaccinationsOnGoing" style={styles.text}/>
            </Picker>
        </View>
      </View>
      <View>
        <ImageDisplay imagePath={'gs://immunify-5c493.appspot.com/images/certificates/sertifikat_lengkap.png'}/>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          {completedAppointments.map(appointment => {
            let appointmentDate;
          if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
            // Firestore Timestamp object
            appointmentDate = new Date(appointment.date.seconds * 1000);
          } else {
            // Attempt to parse it directly
            appointmentDate = new Date(appointment.date);
          }
            const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            {/* const formattedTime = appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); */}
                return (
                  <TouchableOpacity key={appointment.id} style={styles.appointmentContainer}>
                      <View style={styles.appointmentLine}></View>
                      <Text style={styles.appointmentText(fontScale)}>{appointment.childName}, {appointment.vaccineType}</Text>
                      {/* <Text style={styles.appointmentText}>{appointment.vaccineType}</Text> */}
                      <Text style={styles.appointmentText(fontScale)}>{formattedDate}</Text>
                      <View style={styles.appointmentContainerGradient}></View>
                      <ImageDisplay imagePath={appointment.certificateFile}/>
                      <View style={styles.infoIconContainer}>
                        <Foundation name="info" size={windowWidth*0.067} color="black" style={styles.infoIcon}></Foundation>
                      </View>
                  </TouchableOpacity>
                );
          })}
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
    // fontSize: 17,
    fontFamily: 'NunitoSans-Light',
    marginBottom: 16,
  },
  appointmentText: (fontScale) => [{
    fontSize: 20/fontScale,
    fontFamily: 'NunitoSans-Light',
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
    backgroundColor: 'rgb(193,219,155)',
    // position: 'absolute',
    lineHeight: 100,
    padding: 10,
    marginBottom: 10,
    overflow:'hidden',
  },
  pickerContainerGradient:{
    width: windowWidth*0.4,
    height: windowWidth*0.25,
    backgroundColor: 'rgb(160,193,114)',
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
    height: windowWidth*0.62,
    borderRadius: 10,
    backgroundColor: 'rgb(193,219,155)',
    position: 'relative',
    marginTop: 20,
    marginBottom: 16,
    overflow:'hidden',
  },
  appointmentContainerGradient:{
    width: windowWidth*0.25,
    height: windowWidth*0.25,
    backgroundColor: 'rgb(160,193,114)',
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

export default VaccinationsCompletedScreen;

