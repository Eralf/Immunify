import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebasecfg';
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UserContext';

const AppointmentForm = () => {
  const navigation = useNavigation();
  const [vaccineType, setVaccineType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [parentName, setParentName] = useState('');
  const [selectedChildId, setSelectedChildId] = useState(''); // State for selected child ID
  const [selectedChildName, setSelectedChildName] = useState(''); // State for selected child name
  const [modalVisible, setModalVisible] = useState(false);
  const { userID } = useUser();
  const [children, setChildren] = useState([]); // State to store children list

  useEffect(() => {
    // Fetch the children from Firestore
    const fetchChildren = async () => {
      try {
        const childrenSnapshot = await getDocs(collection(db, 'profiles', userID, 'child'));
        const childrenList = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChildren(childrenList);
      } catch (error) {
        console.error('Error fetching children:', error);
      }
    };

    fetchChildren();
  }, [userID]);

  const locations = [
    "RSUP Dr. Cipto Mangunkusumo",
    "RS Pondok Indah",
    "RSUP Sanglah",
    "RSUP Dr. Hasan Sadikin",
    "RSUP Dr. Kariadi",
    "RSUP Fatmawati",
    "RSUP Dr. Sardjito",
    "Siloam Hospitals",
    "Mayapada Hospital",
    "RS Mitra Keluarga",
    "Rumah Sakit Pusat Pertamina",
    "Rumah Sakit Hermina",
    "RS EKA Hospital",
    "RS Harapan Kita",
    "RS Dharmais",
  ];

  const vaccineTypes = [
    "COVID-19",
    "Chickenpox",
    "Hepatitis A",
    "Hepatitis B",
    "HPV",
    "Influenza (Flu)",
    "Measles",
    "Mumps",
    "Rubella",
    "Meningococcal",
    "Pneumococcal",
    "Polio",
    "Rabies",
    "Tetanus",
    "Tuberculosis (BCG)",
    "Yellow Fever",
    "Japanese Encephalitis",
    "Typhoid",
    "Cholera",
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const today = new Date();
    if (currentDate < today.setHours(0, 0, 0, 0)) {
      Alert.alert("Error", "Tanggal tidak boleh sebelum waktu sekarang.");
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    const combinedDateTime = combineDateAndTime(date, currentTime);
    if (combinedDateTime < new Date()) {
      Alert.alert("Error", "Waktu tidak boleh sebelum waktu sekarang.");
      setShowTimePicker(false);
      return;
    }
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const combineDateAndTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(time.getSeconds());
    return combined;
  };

  const validateForm = () => {
    if (!vaccineType || !location || !parentName || !selectedChildId) {
      Alert.alert("Error", "Semua data harus diisi.");
      return false;
    }
    const combinedDateTime = combineDateAndTime(date, time);
    if (combinedDateTime < new Date()) {
      Alert.alert("Error", "Tanggal dan waktu tidak boleh sebelum waktu sekarang.");
      return false;
    }
    return true;
  };

  const submitConfirm = (profileId, childId) => {
    if (validateForm()) {
      const combinedDateTime = combineDateAndTime(date, time);
      const appointmentData = {
        vaccineType: vaccineType,
        location: location,
        date: combinedDateTime,
        parentName: parentName,
        childId: childId,
        childName: selectedChildName, // Include child name
        status: 'Aktif', // Add status field
        announcementDate: new Date(), // Add announcement date field
        isRead: false,
      };

      // Add to child -> appointments collection
      addDoc(collection(db, 'profiles', profileId, 'child', childId, 'appointments'), appointmentData)
        .then((docRef) => {
          const appRefId = docRef.id;
          console.log('Appointment added to child appointments successfully with ID:', appRefId);

          // Add to allappointments collection with the same ID
          const allAppointmentRef = doc(db, 'profiles', profileId, 'allAppointment', appRefId);
          console.log('allAppointmentRef:', allAppointmentRef.id);
          return setDoc(allAppointmentRef, appointmentData);
        })
        .then(() => {
          console.log('Appointment added to allappointments successfully');
          setModalVisible(true);
        })
        .catch((error) => {
          console.error('Error adding appointment:', error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.greeting}>Halo, Douglas</Text>
      <View style={styles.formFrame}>
        <Text style={styles.title}>Buat Janji Baru</Text>

        <Text style={styles.label}>Jenis Vaksin</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={vaccineType}
            onValueChange={(itemValue) => setVaccineType(itemValue)}
          >
            <Picker.Item label="Pilih Jenis Vaksin" value="" />
            {vaccineTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Pilih Lokasi Vaksinasi</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
          >
            <Picker.Item label="Pilih Lokasi Vaksinasi" value="" />
            {locations.map((loc, index) => (
              <Picker.Item key={index} label={loc} value={loc} />
            ))}
          </Picker>
        </View>

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateInput}>
            <Text style={styles.label}>Tanggal</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Tanggal"
                value={date.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TimeInput}>
            <Text style={styles.label}>Waktu</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Waktu"
                value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <Text style={styles.label}>Nama Orang Tua</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Orang Tua"
          value={parentName}
          onChangeText={setParentName}
        />

        <Text style={styles.label}>Nama Anak</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedChildId}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedChildId(itemValue);
              const selectedChild = children.find(child => child.id === itemValue);
              setSelectedChildName(selectedChild ? selectedChild.name : '');
            }}
          >
            <Picker.Item label="Pilih Nama Anak" value="" />
            {children.map((child, index) => (
              <Picker.Item key={index} label={child.name} value={child.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => submitConfirm(userID, selectedChildId)}
          >
            <Text style={styles.confirmButtonText}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity style={styles.checkButton} onPress={() => navigation.navigate('Screen_3')}>
        <Text style={styles.checkButtonText}>Cek Vaksin Terjadwalkan Disini</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Janji berhasil dibuat!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formFrame: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#A9E5FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  TimeInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  checkButton: {
    marginTop: 40,
    padding: 50,
    backgroundColor: '#87cefa',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerContainer: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: 80,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppointmentForm;
