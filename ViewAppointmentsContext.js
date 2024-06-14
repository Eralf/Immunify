import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot } from 'firebase/firestore';
import { useUser } from './UserContext';
import { useChild } from './ChildContext';

const ViewAppointmentsContext = createContext();

export const useViewAppointments = () => {
  return useContext(ViewAppointmentsContext);
};

export const ViewAppointmentsProvider = ({ children }) => {
  const [viewAppointments, setViewAppointments] = useState([]);
  const {userID} = useUser();
  const {childID} = useChild();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'profiles', userID, 'child', childID, 'appointments'), (snapshot) => {
      const updatedAppointments = snapshot.docs.map(doc => ({
        id: doc.id,
        userID,
        childID,
        ...doc.data(),
      }));
    //   console.log(updatedAppointments);
      setViewAppointments(updatedAppointments);
    });

    return unsubscribe;
  }, [userID, childID]);

  return (
    <ViewAppointmentsContext.Provider value={{ viewAppointments, setViewAppointments }}>
      {children}
    </ViewAppointmentsContext.Provider>
  );
};
