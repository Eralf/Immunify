import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const appointments = [
  { id: 1, title: 'Hepatitis A', name: 'Joshua Andrew P', date: '22 May 2024', location: 'Rumah Sakit Carolus', details: 'Full details here...' },
  { id: 2, title: 'Hepatitis B', name: 'Joshua Andrew P', date: '20 Jun 2024', location: 'Rumah Sakit Carolus', details: 'Full details here...' },
  { id: 3, title: 'Booster Pfizer', name: 'Joshua Andrew P', date: '22 May 2024', location: 'Rumah Sakit Carolus', details: 'Full details here...' },
  { id: 4, title: 'Cacar Air', name: 'Joshua Andrew P', date: '22 May 2024', location: 'Rumah Sakit Carolus', details: 'Full details here...' }
];

const AppointmentListScreen = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vaksin Terjadwalkan</Text>
      <ScrollView>
        {appointments.map(appointment => (
          <TouchableOpacity key={appointment.id} style={styles.appointment} onPress={() => openModal(appointment)}>
            <View style={styles.appointmentContent}>
              <View style={styles.appointmentText}>
                <Text style={styles.title}>{appointment.title}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Nama      :</Text> {appointment.name}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Tanggal  :</Text> {appointment.date}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Lokasi     :</Text> {appointment.location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedAppointment && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedAppointment.title}</Text>
              <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Nama Penerima Vaksin:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Tanggal Lahir:</Text>
                  <Text style={styles.modalText}>17 September 2005</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Jenis Kelamin:</Text>
                  <Text style={styles.modalText}>Laki-Laki</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Nama Orangtua:</Text>
                  <Text style={styles.modalText}>Theofilus Tasman</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Tanggal Pengambilan Vaksin:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Waktu Vaksin:</Text>
                  <Text style={styles.modalText}>Pukul 11.00 WIB</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Lokasi Vaksinasi:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Jenis Vaksin:</Text>
                  <Text style={styles.modalText}>AVAXIM® 160</Text>
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.rescheduleButton]} onPress={() => { /* handle reschedule */ }}>
                  <Text style={styles.buttonText}>Jadwalkan Ulang Janji</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                  <Text style={styles.buttonText}>Batalkan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeModal}>
                  <Text style={styles.buttonText}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appointment: {
    padding: 16,
    backgroundColor: '#D7EFFF',
    marginBottom: 8,
    borderRadius: 8,
  },
  appointmentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#01A2FF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rescheduleButton: {
    backgroundColor: '#01A2FF',
    marginBottom: 1,
  },
  cancelButton: {
    backgroundColor: '#EB4242',
  },
});

export default AppointmentListScreen;
