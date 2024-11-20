import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(undefined);
  const [token, setToken] = useState(() => {
    // Ambil token dari localStorage jika ada saat inisialisasi
    return localStorage.getItem('authToken') || null;
  });

  useEffect(() => {
    // Simpan token di localStorage setiap kali ada perubahan
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ data, setData, token ,setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    return useContext(UserContext);
  };