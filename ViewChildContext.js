import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot } from 'firebase/firestore';
import { useUser } from './UserContext';

const ViewChildContext = createContext();

export const useViewChild = () => {
  return useContext(ViewChildContext);
};

export const ViewChildProvider = ({ children }) => {
  const [viewChild, setViewChild] = useState([]);
  const {userID} = useUser();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'profiles', userID, 'child'), (snapshot) => {
      const updatedChild = snapshot.docs.map(doc => ({
        id: doc.id,
        userID,
        ...doc.data(),
      }));
    //   console.log(updatedAppointments);
      setViewChild(updatedChild);
    });

    return unsubscribe;
  }, []);

  return (
    <ViewChildContext.Provider value={{ viewChild, setViewChild }}>
      {children}
    </ViewChildContext.Provider>
  );
};
