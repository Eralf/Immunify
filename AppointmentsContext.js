import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; 
import { collection, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore';

const AppointmentsContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const profileId = 'profileIdExample'; // Replace with dynamic profile ID if necessary

    const unsubscribeAppointments = onSnapshot(
      collection(db, 'profiles', profileId, 'allAppointment'),
      (appointmentSnapshot) => {
        const updatedAppointments = appointmentSnapshot.docs.map(doc => ({
          id: doc.id,
          profileId,
          ...doc.data(),
        }));
        setAppointments(updatedAppointments);
      }
    );

    return () => {
      unsubscribeAppointments();
    };
  }, []);

  const addAppointment = async (profileId, childId, appointmentData) => {
    try {
      // Add to child appointments
      const childCollectionRef = collection(db, 'profiles', profileId, 'child', childId, 'appointments');
      await addDoc(childCollectionRef, appointmentData);

      // Add to allAppointment
      const allAppointmentsCollectionRef = collection(db, 'profiles', profileId, 'allAppointment');
      await addDoc(allAppointmentsCollectionRef, { ...appointmentData, childId });

      // Update local state if needed
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { id: 'new-id', profileId, childId, ...appointmentData },
      ]);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const profileId = 'profileIdExample'; // Replace with dynamic profile ID if necessary

      // Find the appointment to get the childId
      const appointmentToDelete = appointments.find(appt => appt.id === appointmentId);
      if (!appointmentToDelete) {
        throw new Error('Appointment not found');
      }
      const { childId } = appointmentToDelete;
      console.log('childId:', childId);
      // Delete from child appointments
      // await deleteDoc(doc(db, 'profiles', profileId, 'child', childId, 'appointments', appointmentId));

      // Delete from allAppointment
      await deleteDoc(doc(db, 'profiles', profileId, 'allAppointment', appointmentId));

      // Update local state
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, deleteAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsProvider;
