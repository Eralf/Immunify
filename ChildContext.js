import React, {createContext, useState, useContext} from "react";

const ChildContext = createContext();

export const useChild = () => {
    return useContext(ChildContext);
};

export const ChildProvider = ({children, initialChildID=null}) => {
    const [childID, setChildID] = useState(initialChildID);

    return (
    <ChildContext.Provider value={{ childID, setChildID }}>
      {children}
    </ChildContext.Provider>
  );
};