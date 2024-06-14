import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; 
import { collection, onSnapshot, doc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';

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
      // Add to child appointments and get the document reference
      const childCollectionRef = collection(db, 'profiles', profileId, 'child', childId, 'appointments');
      const childDocRef = await addDoc(childCollectionRef, appointmentData);

      // Use the same ID for the allAppointment collection
      const allAppointmentDocRef = doc(db, 'profiles', profileId, 'allAppointment', childDocRef.id);
      await setDoc(allAppointmentDocRef, { ...appointmentData, childId });

      // Update local state
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { id: childDocRef.id, profileId, childId, ...appointmentData },
      ]);

      console.log('Appointment added successfully');
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const profileId = 'profileIdExample'; // Replace with dynamic profile ID if necessary
  
      // Find the appointment to get the childId
      console.log(appointments);
      const appointmentToDelete = appointments.find(appt => appt.id === appointmentId);
      console.log('appointmentToDelete:', appointmentToDelete);
      if (!appointmentToDelete) {
        throw new Error('Appointment not found');
      }
  
      const  childId  = appointmentToDelete.childId; // Ensure childId is extracted correctly
      console.log('childId:', childId);
      // Delete from child appointments
      await deleteDoc(doc(db, 'profiles', profileId, 'child', childId, 'appointments', appointmentId));
  
      // Delete from allAppointment
      await deleteDoc(doc(db, 'profiles', profileId, 'allAppointment', appointmentId));
  
      // Update local state
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  
      console.log('Appointment deleted successfully');
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
