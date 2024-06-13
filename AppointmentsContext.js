import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const AppointmentsContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(updatedAppointments);
    });

    return unsubscribe;
  }, []);

  const deleteAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments, deleteAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
