'use client';

import { createContext, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children, employeeData }) {
  return (
    <UserContext.Provider value={employeeData}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}