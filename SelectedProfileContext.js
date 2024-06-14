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
      const updatedProfiles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfiles(updatedProfiles);
    });

    return unsubscribe;
  }, []);

  const deleteProfile = async (profileId) => {
    try {
      await deleteDoc(doc(db, 'profiles', profileId));
      setProfiles(profiles.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <ProfilesContext.Provider value={{ profiles, setProfiles, deleteProfile }}>
      {children}
    </ProfilesContext.Provider>
  );
};
