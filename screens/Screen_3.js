import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppointments } from '../AppointmentsContext';
import { db } from '../firebasecfg';
import { doc, getDoc } from 'firebase/firestore';

const AppointmentListScreen = () => {
  const { appointments, deleteAppointment } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [childDetails, setChildDetails] = useState(null); // State to store child details
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = async (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);

    // Fetch the child details
    if (appointment.childId) {
      const childRef = doc(db, 'profiles', appointment.profileId, 'child', appointment.childId);
      const childDoc = await getDoc(childRef);
      if (childDoc.exists()) {
        setChildDetails(childDoc.data());
      } else {
        console.error('No such child document!');
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
    setChildDetails(null);
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      await deleteAppointment(selectedAppointment.id);
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vaksin Terjadwalkan</Text>
      <ScrollView>
        {appointments.map(appointment => {
          let appointmentDate;
          if (appointment.date && typeof appointment.date === 'object' && 'seconds' in appointment.date) {
            appointmentDate = new Date(appointment.date.seconds * 1000);
          } else {
            appointmentDate = new Date(appointment.date);
          }

          const formattedDate = appointmentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
          const formattedTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <TouchableOpacity key={appointment.id} style={styles.appointment} onPress={() => openModal(appointment)}>
              <View style={styles.appointmentContent}>
                <View style={styles.appointmentText}>
                  <Text style={styles.title}>{appointment.vaccineType}</Text>
                  <Text style={styles.detailText}><Text style={styles.label}>Nama      :</Text> {appointment.childName}</Text>
                  <Text style={styles.detailText}><Text style={styles.label}>Tanggal  :</Text> {formattedDate}</Text>
                  <Text style={styles.detailText}><Text style={styles.label}>Waktu     :</Text> {formattedTime}</Text>
                  <Text style={styles.detailText}><Text style={styles.label}>Lokasi    :</Text> {appointment.location}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedAppointment && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedAppointment.vaccineType}</Text>
              <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Nama Penerima Vaksin:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.childName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Tanggal Lahir:</Text>
                  <Text style={styles.modalText}>{childDetails ? new Date(childDetails.dob.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Jenis Kelamin:</Text>
                  <Text style={styles.modalText}>{childDetails ? (childDetails.sex ? 'Perempuan' : 'Laki-laki') : ''}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Nama Orangtua:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.parentName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Tanggal Pengambilan Vaksin:</Text>
                  <Text style={styles.modalText}>{new Date(selectedAppointment.date.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Waktu Vaksin:</Text>
                  <Text style={styles.modalText}>{new Date(selectedAppointment.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Lokasi Vaksinasi:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.modalLabel}>Jenis Vaksin:</Text>
                  <Text style={styles.modalText}>{selectedAppointment.vaccineType}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleDelete}>
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
};

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
