import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompletedAppointments } from '../CompletedAppointmentsContext';
import { useMissedAppointments } from '../MissedAppointmentsContext';
import { useViewAppointments } from '../ViewAppointmentsContext';
import { db } from '../firebasecfg';
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useUser } from '../UserContext';
import { useChild } from '../ChildContext';
const AnnouncementsScreen = ({ navigation, route, reads, setReads }) => {
  const [selectedMenu, setSelectedMenu] = useState("semua");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const animations = {
    semua: useRef(new Animated.Value(0)).current,
    mendatang: useRef(new Animated.Value(0)).current,
    berlangsung: useRef(new Animated.Value(0)).current,
    terlewatkan: useRef(new Animated.Value(0)).current,
    selesai: useRef(new Animated.Value(0)).current,
  };
  const { completedAppointments } = useCompletedAppointments();
  const { missedAppointments } = useMissedAppointments();
  const {viewAppointments} = useViewAppointments();
  const { userID } = useUser();
  const {childID} = useChild();
  useEffect(() => {
    Object.keys(animations).forEach(menu => {
      Animated.timing(animations[menu], {
        toValue: selectedMenu === menu ? 2 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [selectedMenu]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const sortAppointmentsByDate = (appointments) => {
    return appointments.sort((a, b) => {
      let dateA, dateB;
  
      // Parse date A
      if (a.announcementDate && typeof a.announcementDate === 'object' && 'seconds' in a.announcementDate) {
        dateA = new Date(a.announcementDate.seconds * 1000);
      } else if (a.announcementDate) {
        dateA = new Date(a.announcementDate);
      } else {
        return 1; // Handle cases where announcementDate is missing in one of the objects
      }
  
      // Parse date B
      if (b.announcementDate && typeof b.announcementDate === 'object' && 'seconds' in b.announcementDate) {
        dateB = new Date(b.announcementDate.seconds * 1000);
      } else if (b.announcementDate) {
        dateB = new Date(b.announcementDate);
      } else {
        return -1; // Handle cases where announcementDate is missing in one of the objects
      }
  
      return dateB - dateA; // Sort in descending order
    });
  };

  const calculateTimeDifference = (date) => {
    const now = new Date();
    const appointmentDate = new Date(date.seconds ? date.seconds * 1000 : date);
    const diffInMs = now - appointmentDate;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears >= 1) {
      return `${diffInYears}y`;
    } else if (diffInMonths >= 1) {
      return `${diffInMonths}mo`;
    } else if (diffInDays >= 1) {
      return `${diffInDays}d`;
    } else if (diffInHours >= 1) {
      return `${diffInHours}h`;
    } else {
      return `${diffInMinutes}m`;
    }
  };

  const sortedCompletedAppointments = sortAppointmentsByDate(completedAppointments);
  const sortedMissedAppointments = sortAppointmentsByDate(missedAppointments);
  const combinedAppointments = [...completedAppointments, ...missedAppointments];
  const sortedCombinedAppointments = sortAppointmentsByDate(viewAppointments);

  const handlePress = async (appointment) => {
    try {
      

      const appointmentRef = doc(db, 'profiles',userID,'child',childID,'appointments',appointment.id);
      console.log(appointmentRef)
      await updateDoc(appointmentRef, { isRead: true });

      if (appointment.status === 'Selesai') {
        navigation.navigate('VaccinationsCompleted');
      } else if (appointment.status === 'Terlewatkan') {
        navigation.navigate('Appointment');
      } else if (appointment.status === 'Berlangsung') {
        navigation.navigate('VaccinationsOnGoing');
      } else if (appointment.status === 'Mendatang') {
        navigation.navigate('VaccinationsUpcoming');
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    // Add any refreshing logic here, like refetching data from API
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000); // Simulating a delay of 2 seconds for refreshing
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Notifikasi</Text>
      <View style={styles.horizontalLine}></View>
      <View style={styles.navigatesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.navigates}>
            {["semua", "mendatang","berlangsung", "terlewatkan", "selesai"].map(menu => (
              <TouchableOpacity key={menu} onPress={() => handleMenuClick(menu)}>
                <View style={styles.menuItem}>
                  <Text style={styles.navigatesText}>
                    {menu.charAt(0).toUpperCase() + menu.slice(1)}
                  </Text>
                  <Animated.View style={[styles.animatedBorder, { borderBottomWidth: animations[menu] }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.horizontalLine}></View>

      <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> // Attach RefreshControl
        }>
        {selectedMenu == "semua" &&
        sortedCombinedAppointments.map(appointment => {
          let appointmentDate;
        if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
          // Firestore Timestamp object
          appointmentDate = new Date(appointment.date.seconds * 1000);
        } else {
          // Attempt to parse it directly
          appointmentDate = new Date(appointment.date);
        }
        const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        if(appointment.status === 'Terlewatkan' || appointment.status === 'Selesai' || appointment.status === 'Mendatang' || appointment.status === 'Berlangsung'){
          return (
            <React.Fragment key={appointment.id}>
                <TouchableOpacity style={[styles.wrapAnnounce,{backgroundColor: appointment.isRead ? 'white':'#D5D5D5'}]} onPress={() => handlePress(appointment)}>
                  <View style={styles.wrapStatus}>
                    <View style={appointment.status === 'Selesai' ? styles.selesai : appointment.status === 'Terlewatkan' ? styles.terlewatkan : appointment.status === 'Mendatang' ? styles.mendatang: styles.berlangsung}>
                      <Text>{appointment.status}</Text>
                    </View>
                    {!appointment.isRead && <View style={styles.redDot}></View>}
                  </View>
                  <View style={styles.wrapInfoTime}>
                    {appointment.status === 'Terlewatkan' && <Text style={styles.information}>Anda melewatkan vaksin {appointment.vaccineType} Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk membuat janji baru!</Text></Text>}
                    {appointment.status === 'Selesai' &&<Text style={styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin {appointment.vaccineType}. <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>}
                    {appointment.status === 'Berlangsung' && <Text style={styles.information}>Anda telah membuat janji untuk vaksin {appointment.vaccineType} pada Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>}
                    {/* Anda perlu mengambil vaksin C pada Tanggal 18 Oktober 2050. Klik untuk Cek! */}
                    {appointment.status === 'Mendatang' && <Text style={styles.information}>Anda perlu mengambil vaksin {appointment.vaccineType} pada Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>}
                    <Text style={styles.time}>{calculateTimeDifference(appointment.announcementDate)}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.horizontalLine}></View>
              </React.Fragment>
          );
        };
      })
          
        }

        {selectedMenu == "selesai" && sortedCombinedAppointments.map(appointment => {
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
                if(appointment.status === 'Selesai'){
                  return (
                    <React.Fragment key={appointment.id}>
                      
                      <TouchableOpacity style={[styles.wrapAnnounce,{backgroundColor: appointment.isRead ? 'white':'#D5D5D5'}]} onPress={() => navigation.navigate('VaccinationsCompleted')}>
                        <View style={styles.wrapStatus}>
                          <View style={styles.selesai}>
                            <Text>{appointment.status}</Text>
                          </View>
                          {!appointment.isRead && <View style={styles.redDot}></View>}
                        </View>
                        <View style={styles.wrapInfoTime}>
                          <Text style={styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin {appointment.vaccineType}. <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>
                          <Text style={styles.time}>{calculateTimeDifference(appointment.announcementDate)}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.horizontalLine}></View>
                    </React.Fragment>
                    // <TouchableOpacity key={appointment.id} style={styles.appointmentContainer} onPress={() => openModal(appointment)}>
                    // <View style={styles.appointmentContainerGradient}></View>
                    //     <View style={styles.appointmentLine}></View>
                    //     <View style={styles.appointmentTextContainer}>
                    //       <Text style={styles.appointmentText(fontScale)}>{appointment.name}, {appointment.vaccineType}</Text>
                    //     </View>
                    //     {/* <Text style={styles.appointmentText}>{appointment.vaccineType}</Text> */}
                    //     <Text style={styles.appointmentText(fontScale)}>{formattedDate}</Text>
                    //     <TouchableOpacity style={styles.infoIconContainer} onPress={() => navigation.navigate("VaccineDetails", {selectedVaccine:appointment.vaccineType, notCompleted:false})}>
                    //       <Foundation name="info" size={windowWidth*0.067} color="black" style={styles.infoIcon}></Foundation>
                    //     </TouchableOpacity>
                    // </TouchableOpacity>
                  );
                };
          })}


        {selectedMenu == "terlewatkan" && sortedCombinedAppointments.map(appointment => {
              let appointmentDate;
            if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
              // Firestore Timestamp object
              appointmentDate = new Date(appointment.date.seconds * 1000);
            } else {
              // Attempt to parse it directly
              appointmentDate = new Date(appointment.date);
            }
            const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            if(appointment.status === 'Terlewatkan'){
              return (
                <React.Fragment key={appointment.id}>
                  <TouchableOpacity style={[styles.wrapAnnounce,{backgroundColor: appointment.isRead ? 'white':'#D5D5D5'}]} onPress={() => navigation.navigate('Appointment')}>
                    <View style={styles.wrapStatus}>
                      <View style={styles.terlewatkan}>
                        <Text>{appointment.status}</Text>
                      </View>
                      {!appointment.isRead && <View style={styles.redDot}></View>}
                    </View>
                    <View style={styles.wrapInfoTime}>
                      
                      <Text style={styles.information}>Anda melewatkan vaksin {appointment.vaccineType} Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk membuat janji baru!</Text></Text>
                      <Text style={styles.time}> {calculateTimeDifference(appointment.date)}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine}></View>
                </React.Fragment>
                
              );
            };
          })}
        {selectedMenu == "mendatang" && sortedCombinedAppointments.map(appointment => {
              let appointmentDate;
            if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
              // Firestore Timestamp object
              appointmentDate = new Date(appointment.date.seconds * 1000);
            } else {
              // Attempt to parse it directly
              appointmentDate = new Date(appointment.date);
            }
            const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            if(appointment.status === 'Mendatang'){
              return (
                <React.Fragment key={appointment.id}>
                  <TouchableOpacity style={[styles.wrapAnnounce,{backgroundColor: appointment.isRead ? 'white':'#D5D5D5'}]} onPress={() => navigation.navigate('VaccinationsUpcoming')}>
                    <View style={styles.wrapStatus}>
                      <View style={styles.mendatang}>
                        <Text>{appointment.status}</Text>
                      </View>
                      {!appointment.isRead && <View style={styles.redDot}></View>}
                    </View>
                    <View style={styles.wrapInfoTime}>
                    {/* Anda perlu mengambil vaksin C pada Tanggal 18 Oktober 2050. Klik untuk Cek! */}
                      <Text style={styles.information}>Anda perlu mengambil vaksin {appointment.vaccineType} pada Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
                      <Text style={styles.time}> {calculateTimeDifference(appointment.announcementDate)}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine}></View>
                </React.Fragment>
                
              );
            };
          })}
        {selectedMenu == "berlangsung" && sortedCombinedAppointments.map(appointment => {
              let appointmentDate;
            if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
              // Firestore Timestamp object
              appointmentDate = new Date(appointment.date.seconds * 1000);
            } else {
              // Attempt to parse it directly
              appointmentDate = new Date(appointment.date);
            }
            const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            if(appointment.status === 'Berlangsung'){
              return (
                <React.Fragment key={appointment.id}>
                  <TouchableOpacity style={[styles.wrapAnnounce,{backgroundColor: appointment.isRead ? 'white':'#D5D5D5'}]} onPress={() => navigation.navigate('VaccinationsOnGoing')}>
                    <View style={styles.wrapStatus}>
                      <View style={styles.berlangsung}>
                        <Text>{appointment.status}</Text>
                      </View>
                      {!appointment.isRead && <View style={styles.redDot}></View>}
                    </View>
                    <View style={styles.wrapInfoTime}>
                    {/* Anda perlu mengambil vaksin C pada Tanggal 18 Oktober 2050. Klik untuk Cek! */}
                    {/* Anda telah membuat janji untuk vaksin C Tahap Pertama pada Tanggal 20 September 2050. Klik untuk Cek ! */}
                      <Text style={styles.information}>Anda telah membuat janji untuk vaksin {appointment.vaccineType} pada Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
                      <Text style={styles.time}> {calculateTimeDifference(appointment.announcementDate)}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine}></View>
                </React.Fragment>
                
              );
            };
          })}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  text: {
    fontSize: 24,
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  horizontalLine: {
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
    width: '100%',
    // marginBottom: 16,
  },
  navigates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 16
  },
  navigatesText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 18,
    marginHorizontal: 10,
    paddingBottom: 16,
  },
  menuItem: {
    alignItems: 'center',
  },
  animatedBorder: {
    width: '100%',
    borderBottomColor: '#72D3FE',
  },
  terlewatkan: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
    backgroundColor: '#EF5454',
    padding: 10,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  mendatang: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
    backgroundColor: '#84D9FE',
    padding: 10,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  selesai: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
    backgroundColor: '#3BDC02',
    padding: 10,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  berlangsung: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
    backgroundColor: '#FFC965',
    padding: 10,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  redDot: {
    backgroundColor: '#FF0000',
    width: 15,
    height: 15,
    borderRadius: 10
  },
  wrapAnnounce: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    // backgroundColor:'#D5D5D5'
  },
  wrapStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  wrapInfoTime: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular'
  },
  information: {
    flex: 2
  },
  time: {
    flex: 1,
    textAlign: 'right'
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold'
  }
});

export default AnnouncementsScreen;
