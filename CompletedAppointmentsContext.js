import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot } from 'firebase/firestore';

const CompletedAppointmentsContext = createContext();

export const useCompletedAppointments = () => {
  return useContext(CompletedAppointmentsContext);
};

export const CompletedAppointmentsProvider = ({ children }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'completedAppointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompletedAppointments(updatedAppointments);
    });

    return unsubscribe;
  }, []);

  return (
    <CompletedAppointmentsContext.Provider value={{ completedAppointments, setCompletedAppointments }}>
      {children}
    </CompletedAppointmentsContext.Provider>
  );
};
