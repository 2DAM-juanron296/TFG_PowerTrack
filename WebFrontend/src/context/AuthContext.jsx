import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userToken: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("userToken");

      if (token) {
        setAuthState({ isLoggedIn: true, userToken: token, isLoading: false });
      } else {
        setAuthState({ isLoggedIn: false, userToken: null, isLoading: false });
      }
    };

    checkLogin();
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setAuthState({
      isLoggedIn: true,
      userToken: token,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuthState({
      isLoggedIn: false,
      userToken: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
