import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebasecfg';
import { collection, addDoc } from "firebase/firestore";

const AppointmentForm = () => {
  const [vaccineType, setVaccineType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const locations = [
    "Location 1",
    "Location 2",
    "Location 3",
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
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

  const submitConfirm = () => {
    const combinedDateTime = combineDateAndTime(date, time);
    addDoc(collection(db, "appointments"), {
      vaccineType: vaccineType,
      location: location,
      dateTime: combinedDateTime,
      parentName: parentName,
      childName: childName,
    }).then(() => {
      console.log('Appointment added successfully');
      setModalVisible(true);
    }).catch((error) => {
      console.error('Error adding appointment: ', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.greeting}>Halo, Douglas</Text>
      <View style={styles.formFrame}>
        <Text style={styles.title}>Buat Janji Baru</Text>

        <Text style={styles.label}>Jenis Vaksin</Text>
        <TextInput
          style={styles.input}
          placeholder="Jenis Vaksin"
          value={vaccineType}
          onChangeText={setVaccineType}
        />
        
        <Text style={styles.label}>Pilih Lokasi Vaksinasi</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
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
        <TextInput
          style={styles.input}
          placeholder="Nama Anak"
          value={childName}
          onChangeText={setChildName}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={submitConfirm}>
            <Text style={styles.confirmButtonText}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.checkButton}>
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
