import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUserToken(token);
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (token) => {
    setIsLoggedIn(true);
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setUserToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
