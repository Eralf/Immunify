import React, {createContext, useState, useContext} from "react";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({children, initialUserID=null}) => {
    const [userID, setUserID] = useState(initialUserID);

    return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};