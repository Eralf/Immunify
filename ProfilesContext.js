import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebasecfg'; // Adjust this path to your Firebase configuration
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const ProfilesContext = createContext();

export const useProfiles = () => {
  return useContext(ProfilesContext);
};

export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'profiles'), (snapshot) => {
      const selectedProfile = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfiles(selectedProfile);
    });

    return unsubscribe;
  }, []);

  return (
    <ProfilesContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfilesContext.Provider>
  );
};
