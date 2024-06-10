import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot } from 'firebase/firestore';

const MissedAppointmentsContext = createContext();

export const useMissedAppointments = () => {
  return useContext(MissedAppointmentsContext);
};

export const MissedAppointmentsProvider = ({ children }) => {
  const [missedAppointments, setMissedAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'missedAppointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMissedAppointments(updatedAppointments);
    });

    return unsubscribe;
  }, []);

  return (
    <MissedAppointmentsContext.Provider value={{ missedAppointments, setMissedAppointments }}>
      {children}
    </MissedAppointmentsContext.Provider>
  );
};
