import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompletedAppointments } from '../CompletedAppointmentsContext';
import { useMissedAppointments } from '../MissedAppointmentsContext';

const AnnouncementsScreen = ({ navigation, route }) => {
  const [selectedMenu, setSelectedMenu] = useState("semua");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const animations = {
    semua: useRef(new Animated.Value(0)).current,
    mendatang: useRef(new Animated.Value(0)).current,
    terlewatkan: useRef(new Animated.Value(0)).current,
    selesai: useRef(new Animated.Value(0)).current,
  };
  const {completedAppointments} = useCompletedAppointments();
  const {missedAppointments} = useMissedAppointments();
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

      if (a.date && typeof a.date === 'object' && 'seconds' in a.date) {
        dateA = new Date(a.date.seconds * 1000);
      } else {
        dateA = new Date(a.date);
      }

      if (b.date && typeof b.date === 'object' && 'seconds' in b.date) {
        dateB = new Date(b.date.seconds * 1000);
      } else {
        dateB = new Date(b.date);
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
  const sortedCombinedAppointments = sortAppointmentsByDate(combinedAppointments);

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
            {["semua", "mendatang", "terlewatkan", "selesai"].map(menu => (
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
            {/* const formattedTime = appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); */}
            const statusStyle = appointment.status === 'Selesai' ? styles.selesai : styles.terlewatkan;
                return (
                  <>
                  <TouchableOpacity key={appointment.id} style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsCompleted')}>
                    <View style={styles.wrapStatus}>
                      <View style={statusStyle}>
                        <Text>{appointment.status}</Text>
                      </View>
                      <View style={styles.redDot}></View>
                    </View>
                    <View style={styles.wrapInfoTime}>
                      <Text style={styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin {appointment.vaccineType}. <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>
                      <Text style={styles.time}>{calculateTimeDifference(appointment.date)}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine}></View>
                  </>
                  
                );
          })
          }
        {selectedMenu == "selesai" && 
        sortedCompletedAppointments.map(appointment => {
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
                <>
                <TouchableOpacity key={appointment.id} style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsCompleted')}>
                  <View style={styles.wrapStatus}>
                    <View style={styles.selesai}>
                      <Text>{appointment.status}</Text>
                    </View>
                    <View style={styles.redDot}></View>
                  </View>
                  <View style={styles.wrapInfoTime}>
                    <Text style={styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin {appointment.vaccineType}. <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>
                    <Text style={styles.time}>{calculateTimeDifference(appointment.date)}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.horizontalLine}></View>
                </>
                
              );
        })}
        {selectedMenu == "terlewatkan" && 
          sortedMissedAppointments.map(appointment => {
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
                  <>
                  <TouchableOpacity key={appointment.id} style={styles.wrapAnnounce} onPress={() => navigation.navigate('Appointment')}>
                    <View style={styles.wrapStatus}>
                    <View style={styles.terlewatkan}>
                      <Text>{appointment.status}</Text>
                    </View>
                      <View style={styles.redDot}></View>
                    </View>
                    <View style={styles.wrapInfoTime}>
                    <Text style={styles.information}>Anda melewatkan vaksin {appointment.vaccineType} Tanggal {formattedDate}. <Text style={styles.boldText}>Klik untuk membuat janji baru!</Text></Text>
                      <Text style={styles.time}> {calculateTimeDifference(appointment.date)}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine}></View>
                  </>
                  
                );
          })
        
        }
        <TouchableOpacity style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsMissed')}>
          <View style={styles.wrapStatus}>
            <View style={styles.terlewatkan}>
              <Text>Terlewatkan</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style={styles.wrapInfoTime}>
            <Text style={styles.information}>Anda melewatkan vaksin C Tanggal 18 September 2010. <Text style={styles.boldText}>Klik untuk membuat janji baru!</Text></Text>
            <Text style={styles.time}> 1h</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>

        <TouchableOpacity style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsUpcoming')}>
          <View style={styles.wrapStatus}>
            <View style={styles.mendatang}>
              <Text>Mendatang</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style={styles.wrapInfoTime}>
            <Text style={styles.information}>Anda perlu mengambil vaksin C pada Tanggal 18 Oktober 2050. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
            <Text style={styles.time}> 1h</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>

        <TouchableOpacity style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsCompleted')}>
          <View style={styles.wrapStatus}>
            <View style={styles.selesai}>
              <Text>Selesai</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style={styles.wrapInfoTime}>
            <Text style={styles.information}><Text style={styles.boldText}>Selamat!</Text> Anda telah mengambil vaksin C Tahap Pertama. <Text style={styles.boldText}>Klik untuk Cek Sertifikat Vaksin Anda!</Text></Text>
            <Text style={styles.time}> 1h</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>

        <TouchableOpacity style={styles.wrapAnnounce} onPress={() => navigation.navigate('VaccinationsOnGoing')}>
          <View style={styles.wrapStatus}>
            <View style={styles.berlangsung}>
              <Text>Berlangsung</Text>
            </View>
            <View style={styles.redDot}></View>
          </View>
          <View style={styles.wrapInfoTime}>
            <Text style={styles.information}>Anda telah membuat janji untuk vaksin C Tahap Pertama pada Tanggal 20 September 2050. <Text style={styles.boldText}>Klik untuk Cek!</Text></Text>
            <Text style={styles.time}> 1h</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginBottom: 16,
  },
  navigates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
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
    marginHorizontal: 20,
    marginBottom: 16
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
